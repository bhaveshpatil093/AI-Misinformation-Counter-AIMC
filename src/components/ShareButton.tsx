
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Twitter, Facebook, Linkedin, Link, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { FactCheck } from "@/data/factChecks";

interface ShareButtonProps {
  fact: FactCheck;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ShareButton = ({ fact, variant = "ghost", size = "icon", className }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/fact/${fact.id}`;
  const shareTitle = `Fact Check: "${fact.claim}"`;
  const shareText = `${fact.summary} - Check the full analysis at`;
  
  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
    
    toast({
      title: "Shared on Twitter",
      description: "The fact check has been shared on Twitter",
    });
  };
  
  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
    
    toast({
      title: "Shared on Facebook",
      description: "The fact check has been shared on Facebook",
    });
  };
  
  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
    
    toast({
      title: "Shared on LinkedIn",
      description: "The fact check has been shared on LinkedIn",
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      
      toast({
        title: "Link copied",
        description: "The fact check link has been copied to your clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className} aria-label="Share fact check">
          <Share2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToLinkedIn} className="cursor-pointer">
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          {copied ? (
            <Check className="w-4 h-4 mr-2 text-verified" />
          ) : (
            <Link className="w-4 h-4 mr-2" />
          )}
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
