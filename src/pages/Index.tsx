
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FactCard from "@/components/FactCard";
import { factChecks } from "@/data/factChecks";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    navigate(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
  };
  
  // Get featured fact checks (most recent 3)
  const featuredFactChecks = factChecks.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-block text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary rounded-full mb-6">
            AI Misinformation Counter
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Verify AI claims with precision and clarity
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Our AI-powered fact-checking platform analyses claims about artificial intelligence 
            to provide accurate, trustworthy information.
          </p>
          
          <div className="pt-6">
            <SearchBar 
              onSearch={handleSearch} 
              className="mx-auto"
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="rounded-xl px-6 py-6 text-base font-medium"
            >
              Browse Fact Checks
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => navigate('/submit')}
              variant="outline"
              size="lg"
              className="rounded-xl px-6 py-6 text-base font-medium"
            >
              Submit a Claim
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Fact Checks */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">Featured Fact Checks</h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-primary"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFactChecks.map((fact) => (
              <FactCard key={fact.id} fact={fact} featured />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Help us combat AI misinformation
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Submit a claim you've encountered for our expert review and 
            contribute to a more factual AI discourse.
          </p>
          <Button 
            onClick={() => navigate('/submit')}
            size="lg"
            className="rounded-xl px-8 py-6 text-base font-medium"
          >
            Submit a Claim
            <Search className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
