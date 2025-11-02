import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Shield, ArrowLeft, Play } from "lucide-react";

const FreelancerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="glass-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-heading font-bold gradient-text">Favork</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="glass-card mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-4xl">
                  RS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-heading font-bold">Riya Sharma</h2>
                    <p className="text-lg text-muted-foreground">Motion Graphics Specialist</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-lg">4.9</span>
                        <span className="text-sm text-muted-foreground">(87 reviews)</span>
                      </div>
                      <Badge className="bg-accent flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">₹1,200/hr</div>
                    <p className="text-sm text-muted-foreground">Professional</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">After Effects</Badge>
                  <Badge variant="secondary">Motion Design</Badge>
                  <Badge variant="secondary">2D Animation</Badge>
                  <Badge variant="secondary">Cinema 4D</Badge>
                </div>
                <p className="mt-4 text-foreground/80">
                  5+ years of experience creating stunning motion graphics for brands and content creators. 
                  Specialized in creating engaging social media content, explainer videos, and brand animations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover-lift cursor-pointer group">
                  <Play className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card mb-6">
          <CardHeader>
            <CardTitle>Client Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "TechStartup Inc", rating: 5, text: "Super fast and professional edit! Exceeded expectations." },
              { name: "Gaming Channel", rating: 5, text: "Amazing motion graphics! Will definitely hire again." },
              { name: "E-commerce Co", rating: 4, text: "Great work, very responsive to feedback." },
            ].map((review, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/80">{review.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-accent/50 border-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-accent">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Hire Securely with Favork Escrow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your payment is protected until you approve the final work
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-transform"
                onClick={() => navigate(`/escrow/${id}`)}
              >
                Hire Riya Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FreelancerProfile;
