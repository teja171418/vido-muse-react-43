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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for movies, series, episodes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-24 h-14 text-lg bg-card/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 placeholder:text-muted-foreground"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()}
          className="absolute right-1 top-1 h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default MovieSearch;