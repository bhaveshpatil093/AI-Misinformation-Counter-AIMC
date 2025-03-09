
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FactCard from "@/components/FactCard";
import { factChecks, VerificationStatus } from "@/data/factChecks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Filter, X } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilters, setActiveFilters] = useState<VerificationStatus[]>([]);
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>([]);
  
  // Extract unique categories
  const categories = Array.from(new Set(factChecks.map(fact => fact.category)));
  
  // Filter facts based on search query and filters
  const filteredFacts = factChecks.filter(fact => {
    const matchesSearch = !searchQuery || 
      fact.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatusFilter = activeFilters.length === 0 || 
      activeFilters.includes(fact.status);
      
    const matchesCategoryFilter = activeCategoryFilters.length === 0 || 
      activeCategoryFilters.includes(fact.category);
      
    return matchesSearch && matchesStatusFilter && matchesCategoryFilter;
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Update URL with search query
    const newParams = new URLSearchParams(location.search);
    if (query) {
      newParams.set("q", query);
    } else {
      newParams.delete("q");
    }
    
    window.history.replaceState(
      {}, 
      '', 
      `${location.pathname}?${newParams.toString()}`
    );
  };
  
  const toggleStatusFilter = (status: VerificationStatus) => {
    setActiveFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };
  
  const toggleCategoryFilter = (category: string) => {
    setActiveCategoryFilters(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
    setActiveCategoryFilters([]);
  };
  
  const hasActiveFilters = activeFilters.length > 0 || activeCategoryFilters.length > 0;
  
  useEffect(() => {
    // Update search when URL query parameter changes
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("q") || "";
    setSearchQuery(urlQuery);
  }, [location.search]);
  
  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      
      {/* Search Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8 animate-fade-up">
            <h1 className="text-3xl font-bold mb-4">AI Fact Check Dashboard</h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse verified AI claims or search for specific information 
              to get accurate, fact-checked results.
            </p>
          </div>
          
          <SearchBar 
            onSearch={handleSearch} 
            className="mx-auto mb-8"
            placeholder="Search for AI claims, facts, or misinformation..."
          />
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center mr-2">
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            {/* Status Filters */}
            <Button
              variant={activeFilters.includes('verified') ? "default" : "outline"}
              size="sm"
              className="rounded-full flex items-center gap-1.5"
              onClick={() => toggleStatusFilter('verified')}
            >
              <CheckCircle className="h-4 w-4 text-verified" />
              Verified
            </Button>
            
            <Button
              variant={activeFilters.includes('false') ? "default" : "outline"}
              size="sm"
              className="rounded-full flex items-center gap-1.5"
              onClick={() => toggleStatusFilter('false')}
            >
              <XCircle className="h-4 w-4 text-false" />
              False
            </Button>
            
            <Button
              variant={activeFilters.includes('mixed') ? "default" : "outline"}
              size="sm"
              className="rounded-full flex items-center gap-1.5"
              onClick={() => toggleStatusFilter('mixed')}
            >
              <AlertTriangle className="h-4 w-4 text-mixed" />
              Mixed
            </Button>
            
            {/* Divider */}
            <div className="h-6 w-px bg-border mx-2" />
            
            {/* Category Filters */}
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategoryFilters.includes(category) ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => toggleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-muted-foreground"
                onClick={clearFilters}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredFacts.length}</span> results
              {searchQuery && (
                <> for "<span className="font-medium">{searchQuery}</span>"</>
              )}
            </div>
          </div>
          
          {/* Results */}
          {filteredFacts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button 
                variant="outline"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacts.map(fact => (
                <FactCard key={fact.id} fact={fact} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
