
import { useState, useEffect } from "react";
import { FactCheck, factChecks } from "@/data/factChecks";
import FactCard from "@/components/FactCard";

interface RelatedFactsProps {
  currentFactId: string;
  category: string;
  limit?: number;
}

const RelatedFacts = ({ currentFactId, category, limit = 3 }: RelatedFactsProps) => {
  const [relatedFacts, setRelatedFacts] = useState<FactCheck[]>([]);
  
  useEffect(() => {
    // Find related facts by category, excluding the current fact
    const related = factChecks
      .filter(fact => fact.id !== currentFactId && fact.category === category)
      .slice(0, limit);
    
    // If we don't have enough related facts by category, add some recent ones
    if (related.length < limit) {
      const recent = factChecks
        .filter(fact => fact.id !== currentFactId && !related.some(r => r.id === fact.id))
        .slice(0, limit - related.length);
      
      setRelatedFacts([...related, ...recent]);
    } else {
      setRelatedFacts(related);
    }
  }, [currentFactId, category, limit]);
  
  if (relatedFacts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Related Fact Checks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedFacts.map((fact) => (
          <FactCard key={fact.id} fact={fact} />
        ))}
      </div>
    </div>
  );
};

export default RelatedFacts;
