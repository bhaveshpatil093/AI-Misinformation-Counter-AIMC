
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { factChecks, FactCheck as FactCheckType } from "@/data/factChecks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import VerificationStatus from "@/components/VerificationStatus";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Link2 } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import RelatedFacts from "@/components/RelatedFacts";
import NewsletterSignup from "@/components/NewsletterSignup";

const FactCheckPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [fact, setFact] = useState<FactCheckType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Find the fact check with the matching ID
    const foundFact = factChecks.find(f => f.id === id);
    setFact(foundFact || null);
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!fact) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-4">Fact Check Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The fact check you're looking for doesn't exist or may have been removed.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Browse All Fact Checks
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 px-6">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <VerificationStatus status={fact.status} size="lg" />
            <div className="flex items-center gap-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                {fact.date}
              </div>
              <ShareButton fact={fact} />
            </div>
          </div>
          
          <div className="glass rounded-2xl p-8 mb-12">
            <h1 className="text-3xl font-bold mb-6">{fact.claim}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <Link2 className="mr-2 h-4 w-4" />
              Source: {fact.source}
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="text-lg">{fact.summary}</p>
              
              <h2 className="text-xl font-semibold pt-4">Detailed Explanation</h2>
              <p className="whitespace-pre-line">{fact.explanation}</p>
              
              <h2 className="text-xl font-semibold pt-4">References</h2>
              <ul className="list-disc pl-6">
                {fact.references.map((ref, index) => (
                  <li key={index} className="mb-2">
                    <a 
                      href={ref} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {ref}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <NewsletterSignup className="mb-12" />
          
          <RelatedFacts currentFactId={fact.id} category={fact.category} />
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FactCheckPage;
