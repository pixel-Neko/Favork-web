import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

const loadRazorpayScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const EscrowPayment = () => {
    const navigate = useNavigate();
    
    const [status, setStatus] = useState<'setup' | 'funded' | 'released'>('setup');
    const [isLoading, setIsLoading] = useState(false);
    const [jobId, setJobId] = useState<number | null>(null);
    const [fundTxnHash, setFundTxnHash] = useState<string | null>(null);
    const [releaseTxnHash, setReleaseTxnHash] = useState<string | null>(null);

    const [projectName, setProjectName] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => { loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js"); }, []);

    const handleFundPayment = () => {
        if (!projectName || !amount) {
            toast.error("Please fill in the project name and amount.");
            return;
        }
        setIsLoading(true);
        const options = {
            key: "rzp_test_RaCtoosVWPeQ9y", amount: parseFloat(amount) * 100, currency: "INR",
            name: "Favork Inc.", description: `Escrow for Project: ${projectName}`,
            handler: async function (response: any) {
                toast.success(`Razorpay test payment successful!`);
                toast.info("Logging 'FUNDED' transaction to Aptos...");
                try {
                    const backendResponse = await fetch("/api/fund-payment", {
                        method: 'POST', headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpayPaymentId: response.razorpay_payment_id,
                            projectName: projectName, amount: amount,
                        }),
                    });
                    const result = await backendResponse.json();
                    if (!backendResponse.ok) throw new Error(result.error);
                    
                    setJobId(result.jobId);
                    setFundTxnHash(result.hash);
                    setStatus('funded'); // <-- CHANGE UI to "Funded" state
                    toast.success("Funds locked in escrow on Aptos! 🔒");
                } catch (error: any) {
                    toast.error("Failed to log funding transaction.", { description: error.message });
                } finally { setIsLoading(false); }
            },
            prefill: { name: "Test Client", email: "test.client@example.com" },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', () => { setIsLoading(false); toast.error("Payment failed or was cancelled."); });
    };

    const handleReleasePayment = async () => {
        if (!jobId) {
            toast.error("Job ID is missing. Cannot release funds.");
            return;
        }
        setIsLoading(true);
        toast.info("Logging 'RELEASED' transaction to Aptos...");
        try {
            const backendResponse = await fetch(`/api/release-funds/${jobId}`, { method: 'POST' });
            const result = await backendResponse.json();
            if (!backendResponse.ok) throw new Error(result.error);
            
            setReleaseTxnHash(result.hash);
            setStatus('released'); // <-- CHANGE UI to final "Released" state
            toast.success("Funds released to freelancer on Aptos! ✅");
        } catch (error: any) {
            toast.error("Failed to log release transaction.", { description: error.message });
        } finally { setIsLoading(false); }
    };
    
    return (
     <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <header className="glass-card border-b sticky top-0 z-10">
           <div className="container mx-auto px-4 py-4 flex items-center gap-4"><Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button><h1 className="text-2xl font-heading font-bold gradient-text">Favork Escrow</h1></div>
        </header>
        <main className="container mx-auto px-4 py-8 max-w-xl">
           <Card className="glass-card">
              {status === 'setup' && (
                <>
                  <CardHeader><CardTitle>Create & Fund Project</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                       <div className="space-y-2"><Label>Project Name</Label><Input value={projectName} onChange={(e) => setProjectName(e.target.value)} /></div>
                       <div className="space-y-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} /></div>
                       <div className="space-y-2"><Label>Total Amount (INR)</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
                       <Button onClick={handleFundPayment} disabled={isLoading} className="w-full h-12 text-lg bg-gradient-to-r from-accent to-accent/80 mt-4">
                           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Deposit via Razorpay & Fund Escrow"}
                       </Button>
                  </CardContent>
                </>
              )}
              {status === 'funded' && (
                <>
                    <CardHeader><CardTitle className="text-center text-xl text-accent">Funds Locked in Escrow</CardTitle></CardHeader>
                    <CardContent className="text-center space-y-6 py-10">
                        <Lock className="w-20 h-20 mx-auto text-accent" />
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Project "{projectName}" is Funded</h3>
                            <p className="text-sm text-muted-foreground">The funds are held securely. You can release them to the freelancer once the work is complete.</p>
                        </div>
                        <a href={`https://explorer.aptoslabs.com/txn/${fundTxnHash}?network=testnet`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent hover:underline">
                            View Funding Transaction on Aptos
                        </a>
                        <Button onClick={handleReleasePayment} disabled={isLoading} className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-green-600">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Approve & Release Funds ✅"}
                        </Button>
                    </CardContent>
                </>
              )}
              {status === 'released' && (
                <>
                  <CardHeader><CardTitle className="text-center text-2xl text-green-500">Payment Released!</CardTitle></CardHeader>
                  <CardContent className="text-center space-y-6 py-10">
                    <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Transaction Logged on Aptos</h3>
                        <p className="text-sm text-muted-foreground">The funds have been released to the freelancer.</p>
                    </div>
                    <a href={`https://explorer.aptoslabs.com/txn/${releaseTxnHash}?network=testnet`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent hover:underline">
                        View Release Transaction on Aptos
                    </a>
                    <Button onClick={() => navigate('/client/dashboard')} className="w-full">
                        Back to Dashboard
                    </Button>
                  </CardContent>
                </>
              )}
           </Card>
        </main>
     </div>
    );
};
export default EscrowPayment;