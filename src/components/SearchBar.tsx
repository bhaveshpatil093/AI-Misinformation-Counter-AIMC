
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ 
  onSearch, 
  className,
  placeholder = "Search for facts to verify..." 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  // Animation effect when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.classList.add('animate-fade-in');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-3xl transition-all duration-300 ease-in-out",
        isFocused ? "scale-105" : "scale-100",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center glass rounded-2xl px-6 transition-all duration-300",
        isFocused ? "shadow-lg" : "shadow-sm"
      )}>
        <Search className={cn(
          "text-muted-foreground absolute left-3 h-5 w-5 transition-all",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-4 pl-10 pr-4 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground opacity-0 transition-opacity"
          style={{ opacity: 1 }}
        />
        
        <button 
          type="submit"
          className={cn(
            "absolute right-3 bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm transition-all",
            query.trim() ? "opacity-100" : "opacity-0",
            "hover:bg-primary/90"
          )}
          disabled={!query.trim()}
        >
          Verify
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
