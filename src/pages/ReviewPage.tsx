import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clientRating, setClientRating] = useState(0);
  const [clientFeedback, setClientFeedback] = useState("");
  const [freelancerRating, setFreelancerRating] = useState(0);
  const [freelancerFeedback, setFreelancerFeedback] = useState("");

  const handleSubmit = () => {
    if (clientRating === 0 || freelancerRating === 0) {
      toast.error("Please provide ratings for both parties");
      return;
    }

    toast.success("Thank you! Your feedback strengthens trust on Favork.", {
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/client/dashboard");
    }, 1500);
  };

  const StarRating = ({ rating, setRating }: { rating: number; setRating: (n: number) => void }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-8 h-8 cursor-pointer transition-all ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          } hover:scale-110`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">
            Share Your Experience
          </h1>
          <p className="text-muted-foreground">
            Help build trust in the Favork community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Rate the Freelancer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">How was your experience with Riya Sharma?</p>
                <StarRating rating={clientRating} setRating={setClientRating} />
              </div>
              <div>
                <Textarea
                  placeholder="Share your thoughts about the work quality, communication, and overall experience..."
                  value={clientFeedback}
                  onChange={(e) => setClientFeedback(e.target.value)}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Rate the Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Freelancer: Rate your client experience</p>
                <StarRating rating={freelancerRating} setRating={setFreelancerRating} />
              </div>
              <div>
                <Textarea
                  placeholder="Share feedback about communication, clarity of requirements, and cooperation..."
                  value={freelancerFeedback}
                  onChange={(e) => setFreelancerFeedback(e.target.value)}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-center">Recent Community Feedback</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm">"Super fast and professional edit!"</p>
                  <p className="text-xs text-muted-foreground mt-1">- TechStartup Inc</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm">"Client was cooperative and responsive."</p>
                  <p className="text-xs text-muted-foreground mt-1">- Aditya M.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-transform px-12"
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
