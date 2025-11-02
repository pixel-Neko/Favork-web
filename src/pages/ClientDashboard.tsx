import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star, Shield, LogOut } from "lucide-react";

const freelancers = [
  {
    id: 1,
    name: "Riya Sharma",
    specialty: "Motion Graphics",
    rate: 1200,
    rating: 4.9,
    reviews: 87,
    skills: ["After Effects", "Motion Design", "2D Animation"],
  },
  {
    id: 2,
    name: "Aditya Mehta",
    specialty: "Reels Editing",
    rate: 900,
    rating: 4.8,
    reviews: 64,
    skills: ["Premiere Pro", "Instagram Reels", "TikTok"],
  },
  {
    id: 3,
    name: "Sneha Verma",
    specialty: "YouTube Editing",
    rate: 1500,
    rating: 4.7,
    reviews: 102,
    skills: ["YouTube", "Color Grading", "Thumbnails"],
  },
  {
    id: 4,
    name: "Arjun Patel",
    specialty: "Wedding Films",
    rate: 1800,
    rating: 4.9,
    reviews: 45,
    skills: ["Cinematic", "Color Correction", "Audio Mix"],
  },
  {
    id: 5,
    name: "Priya Singh",
    specialty: "Corporate Videos",
    rate: 1300,
    rating: 4.6,
    reviews: 56,
    skills: ["Premiere Pro", "Corporate", "Interviews"],
  },
  {
    id: 6,
    name: "Rahul Kumar",
    specialty: "Music Videos",
    rate: 1600,
    rating: 4.8,
    reviews: 73,
    skills: ["Davinci Resolve", "Effects", "Sync"],
  },
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="glass-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold gradient-text">Favork</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-heading font-bold">Find Your Ideal Video Editor</h2>
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by skill, specialty, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <Card key={freelancer.id} className="glass-card hover-lift">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xl">
                      {freelancer.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-lg truncate">
                      {freelancer.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{freelancer.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{freelancer.rating}</span>
                      <span className="text-xs text-muted-foreground">({freelancer.reviews})</span>
                      <Shield className="w-4 h-4 text-accent ml-1" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {freelancer.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="text-2xl font-bold text-primary">
                  ₹{freelancer.rate}/hr
                </div>
              </CardContent>
              
              <CardFooter className="gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate(`/freelancer/${freelancer.id}`)}
                >
                  View Profile
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-accent to-accent/80"
                  onClick={() => navigate(`/escrow/${freelancer.id}`)}
                >
                  Hire Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
