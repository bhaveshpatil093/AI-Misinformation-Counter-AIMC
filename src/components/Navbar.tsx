
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">Ai</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">AIMC</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/dashboard" active={location.pathname === "/dashboard"}>Dashboard</NavLink>
          <NavLink to="/submit" active={location.pathname === "/submit"}>Submit Claim</NavLink>
          <ThemeToggle />
        </div>
        
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium",
        active 
          ? "text-primary" 
          : "text-foreground/80 hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
