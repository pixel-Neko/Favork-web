# 💼 Favork - Escrow Platform

> *Empowering trust in freelancing with Web3 transparency and Web2 simplicity.*

---

## 🧩 About the Project

*Favork* is a hybrid *Web2 + Web3 freelance escrow platform* that ensures secure, transparent, and automated payments between clients and freelancers.  
Clients can pay using *Razorpay (INR), which is then converted into **USDC and locked in escrow* on the *Aptos blockchain* until the client approves the work.  
Once approved, the funds are instantly released to the freelancer’s wallet — *no middlemen, no delays, just trustless collaboration.*

---

## 🚨 Problem

Freelancers often face:
- Delayed or missing payments after delivering work  
- Lack of transparency in centralized platforms  
- High service fees and complex dispute systems  

Clients struggle with:
- Ensuring that freelancers deliver quality work before payment  
- Trusting that their funds are safe until delivery  

---

## 💡 Solution

*Favork* bridges the best of both worlds — *Web2 ease + Web3 security*.

- Clients *pay in INR* through Razorpay (Web2 layer).  
- Payment automatically converts into *USDC* and is *locked in an Aptos smart contract* (Web3 layer).  
- Freelancers submit proof of work securely.  
- Clients approve when satisfied, triggering *on-chain release* of funds.

✅ Simple, transparent, and fair for both parties.

---

## ✨ Key Features

- 💼 *Create and manage jobs* with a clean dashboard  
- 💳 *Hybrid payments* — Razorpay INR → USDC on Aptos  
- 🔒 *On-chain escrow* for fund security  
- 📁 *Freelancer submissions* via GitHub/Drive links  
- ✅ *Client approval and fund release* in one click  
- 🔗 *Aptos Explorer integration* for transaction tracking  
- 🎨 *Modern, minimal UI* built with TailwindCSS + shadcn/ui  

---

## 🧠 Tech Stack

*Frontend:* React, Vite, TailwindCSS, React Router  
*Backend:* Node.js, Express, MongoDB, Razorpay SDK  
*Blockchain:* Aptos SDK, Move Smart Contracts  

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pixel-Neko/Favork-web.git
cd Favork-web
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Start Development Server
bash
Copy code
npm run dev
Visit 👉 http://localhost:5173

🔐 Environment Variables
Create a .env file inside /server and add:

ini
Copy code
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
MONGO_URI=your_mongo_connection
APTOS_PRIVATE_KEY=your_private_key
🏗 Project Flow
Client → Creates a job and pays via Razorpay

Funds → Converted to USDC & locked on Aptos escrow

Freelancer → Submits work link

Client → Approves and releases payment

Transaction → Verified on Aptos Explorer


🤝 Contributions
We welcome contributions!

Fork the repo

Create your feature branch (git checkout -b feature-name)

Commit changes and push (git push origin feature-name)

Open a Pull Request 🚀

