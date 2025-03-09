
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ExternalLink } from "lucide-react";
import { FactCheck } from "@/data/factChecks";
import VerificationStatus from "./VerificationStatus";
import { cn } from "@/lib/utils";

interface FactCardProps {
  fact: FactCheck;
  featured?: boolean;
}

const FactCard = ({ fact, featured = false }: FactCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/fact/${fact.id}`}
      className={cn(
        "block glass rounded-2xl transition-all duration-300 overflow-hidden",
        featured ? "p-6" : "p-4",
        isHovered ? "transform shadow-lg -translate-y-1" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded-full">
              {fact.category}
            </span>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {fact.date}
            </div>
          </div>
          
          <h3 className={cn(
            "font-semibold text-foreground transition-all duration-300 line-clamp-2",
            featured ? "text-xl mb-3" : "text-lg mb-2",
            isHovered ? "text-primary" : ""
          )}>
            {fact.claim}
          </h3>
          
          <p className="text-muted-foreground line-clamp-2 mb-3 text-sm">
            {fact.summary}
          </p>
        </div>
        
        <VerificationStatus 
          status={fact.status} 
          size={featured ? "lg" : "md"} 
          className="flex-shrink-0"
        />
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-muted-foreground">
          Source: <span className="font-medium">{fact.source}</span>
        </div>
        
        <div className={cn(
          "text-sm font-medium text-primary flex items-center gap-1 transition-all duration-300",
          isHovered ? "transform translate-x-1" : ""
        )}>
          <span>Read more</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
};

export default FactCard;
