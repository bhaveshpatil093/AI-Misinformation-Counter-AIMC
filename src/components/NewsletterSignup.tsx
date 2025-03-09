
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MailCheck, Loader2 } from "lucide-react";

const NewsletterSignup = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
      
      toast({
        title: "Subscribed successfully",
        description: "You'll receive fact-checking updates in your inbox.",
      });
      
      // Reset subscription state after a delay
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className={`glass rounded-xl p-6 ${className}`}>
      <div className="flex flex-col space-y-4">
        <h3 className="text-xl font-semibold">Stay Updated</h3>
        <p className="text-muted-foreground">
          Get the latest fact checks and AI insights delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || isSubscribed}
            className="flex-1"
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting || isSubscribed}
            className="whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : isSubscribed ? (
              <>
                <MailCheck className="mr-2 h-4 w-4" />
                Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
