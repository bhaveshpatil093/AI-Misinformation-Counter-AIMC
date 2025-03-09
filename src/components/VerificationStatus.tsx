
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { VerificationStatus as StatusType } from "@/data/factChecks";

interface VerificationStatusProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const VerificationStatus = ({ 
  status, 
  size = "md", 
  showText = true,
  className 
}: VerificationStatusProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };
  
  const iconSizes = {
    sm: { width: 16, height: 16 },
    md: { width: 20, height: 20 },
    lg: { width: 24, height: 24 }
  };
  
  const statusConfig = {
    verified: {
      icon: CheckCircle,
      text: "Verified",
      color: "text-verified"
    },
    false: {
      icon: XCircle,
      text: "False",
      color: "text-false"
    },
    mixed: {
      icon: AlertTriangle,
      text: "Mixed",
      color: "text-mixed"
    }
  };
  
  const { icon: Icon, text, color } = statusConfig[status];

  return (
    <div className={cn("flex items-center gap-1.5", sizeClasses[size], color, className)}>
      <Icon {...iconSizes[size]} className="animate-pulse-slow" />
      {showText && <span className="font-medium">{text}</span>}
    </div>
  );
};

export default VerificationStatus;
