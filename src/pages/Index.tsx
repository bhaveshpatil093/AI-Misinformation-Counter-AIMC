
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FactCard from "@/components/FactCard";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { factChecks } from "@/data/factChecks";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, BarChart3, Clock, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";
import heroImage from "@/assets/images/hero-image.svg";
import techBg from "@/assets/images/tech-bg.svg";

const Index = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    navigate(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
  };
  
  // Get featured fact checks (most recent 3)
  const featuredFactChecks = factChecks.slice(0, 3);
  
  const features = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Advanced Text Analysis",
      description: "Our AI scans and analyzes text content to identify potential misinformation patterns and suspicious claims."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-verified" />,
      title: "Fact Verification",
      description: "Cross-references content with a database of verified information to confirm accuracy and credibility."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-mixed" />,
      title: "Misinformation Alerts",
      description: "Receive instant notifications when potential false information is detected in content you're analyzing."
    },
    {
      icon: <ExternalLink className="w-6 h-6 text-blue-400" />,
      title: "Source Evaluation",
      description: "Assess the credibility of sources and identify potentially misleading or biased information."
    },
    {
      icon: <Clock className="w-6 h-6 text-false" />,
      title: "Real-time Processing",
      description: "Get immediate results with our powerful AI processing that analyzes content in seconds."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-accent" />,
      title: "Confidence Metrics",
      description: "View detailed confidence scores that indicate the reliability of our AI's assessment."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="text-center lg:text-left space-y-8 animate-fade-up flex-1">
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
                className="mx-auto lg:mx-0 max-w-xl"
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
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
          
          <div className="flex-1 flex justify-center animate-bounce-slow">
            <img 
              src={heroImage} 
              alt="AI Fact Checking Illustration" 
              className="max-w-full h-auto shadow-lg rounded-2xl"
              style={{maxHeight: "400px", width: "auto"}}
            />
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={techBg} 
            alt="Technology Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AIMC combines cutting-edge AI with reliable fact-checking
              methodology to deliver accurate results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
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
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
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
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
