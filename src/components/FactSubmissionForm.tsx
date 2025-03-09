
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FactSubmissionForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    claim: "",
    source: "",
    context: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Claim submitted successfully",
        description: "We'll evaluate your submission and add it to our database.",
      });
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          claim: "",
          source: "",
          context: ""
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass rounded-2xl p-8 max-w-2xl mx-auto animate-fade-up"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="claim" className="text-base">
            Claim to Verify
          </Label>
          <Input
            id="claim"
            name="claim"
            value={formData.claim}
            onChange={handleChange}
            placeholder="Enter the claim you want fact-checked"
            required
            className="py-6 px-4 text-base"
            disabled={isSubmitting || isSubmitted}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="source" className="text-base">
            Source
          </Label>
          <Input
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Where did you encounter this claim? (URL, social media, etc.)"
            className="py-6 px-4 text-base"
            disabled={isSubmitting || isSubmitted}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="context" className="text-base">
            Additional Context
          </Label>
          <Textarea
            id="context"
            name="context"
            value={formData.context}
            onChange={handleChange}
            placeholder="Provide any additional information that might help with verification"
            className="min-h-[150px] px-4 py-3 text-base"
            disabled={isSubmitting || isSubmitted}
          />
        </div>
        
        <Button 
          type="submit" 
          className={cn(
            "w-full py-6 text-base font-medium transition-all duration-300",
            isSubmitted ? "bg-verified hover:bg-verified" : "bg-primary hover:bg-primary/90"
          )}
          disabled={isSubmitting || isSubmitted}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : isSubmitted ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Submitted Successfully
            </>
          ) : (
            "Submit for Fact-Checking"
          )}
        </Button>
      </div>
    </form>
  );
};

export default FactSubmissionForm;
