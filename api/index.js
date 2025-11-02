import express from 'express';
import cors from 'cors';
import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database" for the demo
let jobs = {};
let jobIdCounter = 1;

// --- APTOS SETUP ---
// This safely reads the private key from your Vercel Environment Variables
const privateKey = new Ed25519PrivateKey(process.env.APTOS_PRIVATE_KEY);
const serverAccount = Account.fromPrivateKey({ privateKey });

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

// --- API ENDPOINTS ---

// Endpoint to fund a new job
app.post('/api/fund-payment', async (req, res) => {
    const { razorpayPaymentId, projectName, amount } = req.body;
    const newJobId = jobIdCounter++;
    const memo = `Favork Job #${newJobId} FUNDED: ${projectName}, INR ${amount}`;

    try {
        const transaction = await aptos.transaction.build.simple({
            sender: serverAccount.accountAddress,
            data: { function: "0x1::aptos_account::transfer", functionArguments: [serverAccount.accountAddress, 0] },
            options: { memo },
        });
        const committedTxn = await aptos.signAndSubmitTransaction({ signer: serverAccount, transaction });
        
        jobs[newJobId] = { id: newJobId, projectName, amount, status: 'funded', fundHash: committedTxn.hash };
        console.log(`Funding successful for Job #${newJobId}. Hash: ${committedTxn.hash}`);
        res.status(200).json({ jobId: newJobId, hash: committedTxn.hash });
    } catch (error) {
        console.error("Aptos funding transaction failed:", error);
        res.status(500).json({ error: "Failed to log funding on Aptos." });
    }
});

// Endpoint to release funds for an existing job
app.post('/api/release-funds/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const job = jobs[jobId];

    if (!job) return res.status(404).json({ error: "Job not found." });
    if (job.status !== 'funded') return res.status(400).json({ error: `Job is already ${job.status}.` });
    
    const memo = `Favork Job #${jobId} RELEASED: ${job.projectName}`;

    try {
        const transaction = await aptos.transaction.build.simple({
            sender: serverAccount.accountAddress,
            data: { function: "0x1::aptos_account::transfer", functionArguments: [serverAccount.accountAddress, 0] },
            options: { memo },
        });
        const committedTxn = await aptos.signAndSubmitTransaction({ signer: serverAccount, transaction });

        job.status = 'released';
        job.releaseHash = committedTxn.hash;
        console.log(`Release successful for Job #${jobId}. Hash: ${committedTxn.hash}`);
        res.status(200).json({ hash: committedTxn.hash });
    } catch (error) {
        console.error("Aptos release transaction failed:", error);
        res.status(500).json({ error: "Failed to log release on Aptos." });
    }
});

// This exports the app for Vercel to use
export default app;