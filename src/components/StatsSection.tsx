
import { BarChart3, AlertTriangle, CheckCircle, Search } from "lucide-react";
import { factChecks } from "@/data/factChecks";

const StatsSection = () => {
  // Calculate statistics from the factChecks data
  const totalFactChecks = factChecks.length;
  const verifiedClaims = factChecks.filter(fact => fact.status === 'verified').length;
  const falseClaims = factChecks.filter(fact => fact.status === 'false').length;
  const mixedClaims = factChecks.filter(fact => fact.status === 'mixed').length;
  
  // Calculate percentages
  const verifiedPercentage = Math.round((verifiedClaims / totalFactChecks) * 100);
  const falsePercentage = Math.round((falseClaims / totalFactChecks) * 100);
  const mixedPercentage = Math.round((mixedClaims / totalFactChecks) * 100);
  
  const stats = [
    {
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
      value: totalFactChecks,
      label: "Total Claims Analyzed",
      description: "AI claims analyzed by our team of experts"
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-verified" />,
      value: `${verifiedPercentage}%`,
      label: "Verified Claims",
      description: "Claims that were found to be accurate"
    },
    {
      icon: <AlertTriangle className="w-10 h-10 text-false" />,
      value: `${falsePercentage}%`,
      label: "False Claims",
      description: "Claims that were found to be inaccurate"
    },
    {
      icon: <Search className="w-10 h-10 text-mixed" />,
      value: `${mixedPercentage}%`,
      label: "Mixed Claims",
      description: "Claims with partial accuracy"
    }
  ];
  
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Fact-Checking Impact
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
