import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface MovieSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const MovieSearch = ({ onSearch, isLoading }: MovieSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for movies, series, episodes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-20 sm:pr-24 h-12 sm:h-14 text-base sm:text-lg bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 placeholder:text-muted-foreground touch-target"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="absolute right-1 top-1 h-10 sm:h-12 px-3 sm:px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg touch-target"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default MovieSearch;