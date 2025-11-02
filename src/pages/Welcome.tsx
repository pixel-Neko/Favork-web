import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Video } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center p-6">
      {/* Increased breadth (max-w-5xl → makes card wider) */}
      <div className="text-center max-w-5xl w-full mx-auto space-y-12">
        <div className="bg-white rounded-3xl shadow-2xl p-12 space-y-8 transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl">
          <div className="space-y-4">
            <h1 className="text-7xl font-heading font-extrabold text-black tracking-tight">
              Favork
            </h1>
            <p className="text-2xl font-semibold text-gray-700 leading-snug">
              No Delays. Just Secure, Creative Work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-10">
            <Button
              onClick={() => navigate("/auth?role=client")}
              size="lg"
              className="w-full sm:w-auto h-16 px-10 text-lg bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Briefcase className="mr-2 h-6 w-6" />
              Join as Client
            </Button>

            <Button
              onClick={() => navigate("/auth?role=freelancer")}
              size="lg"
              className="w-full sm:w-auto h-16 px-10 text-lg bg-gray-800 text-white hover:bg-black transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Video className="mr-2 h-6 w-6" />
              Join as Freelancer
            </Button>
          </div>

          <p className="text-base text-gray-600 mt-8">
            Work confidently. Get paid securely with Aptos blockchain. 🔒
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform text-center">
            <p className="text-4xl font-bold text-black mb-2">300+</p>
            <p className="text-md text-gray-600">Verified Video Editors</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform text-center">
            <p className="text-4xl font-bold text-black mb-2">₹3.5L+</p>
            <p className="text-md text-gray-600">Secure Transactions</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform text-center">
            <p className="text-4xl font-bold text-black mb-2">4.8/5</p>
            <p className="text-md text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
