
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { factChecks } from "@/data/factChecks";
import VerificationStatus from "@/components/VerificationStatus";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import factCheckImage from "@/assets/images/fact-check.svg";

const FactCheck = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the fact with the matching ID
  const fact = factChecks.find(f => f.id === id);
  
  // Animate entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle case where fact is not found
  if (!fact && !isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">
            Fact check not found
          </h1>
          <p className="text-muted-foreground mb-8">
            The fact check you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      
      <div className="pt-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 -ml-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {fact && (
            <div className={cn(
              "transition-all duration-500",
              isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}>
              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <div className="md:flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="px-3 py-1 text-xs font-medium">
                      {fact.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {fact.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{fact.claim}</h1>
                  </div>
                  
                  <VerificationStatus status={fact.status} size="lg" />
                </div>
                
                <div className="md:w-1/3 flex justify-center">
                  <img 
                    src={factCheckImage} 
                    alt="Fact Check Verification" 
                    className="max-w-full h-auto rounded-lg shadow-md"
                    style={{maxHeight: "160px", width: "auto"}}
                  />
                </div>
              </div>
              
              <div className="glass p-6 rounded-2xl mb-8">
                <h2 className="text-xl font-semibold mb-3">Summary</h2>
                <p className="text-muted-foreground">{fact.summary}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Detailed Explanation</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {fact.explanation}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Source</h2>
                  <p className="text-muted-foreground">
                    This claim was found in: <span className="font-medium">{fact.source}</span>
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">References</h2>
                  <ul className="space-y-3">
                    {fact.references.map((reference, index) => (
                      <li key={index}>
                        <a 
                          href={reference} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-start text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span>{reference}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactCheck;
