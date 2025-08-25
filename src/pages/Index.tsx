import { useState } from "react";
import MovieSearch from "@/components/MovieSearch";
import MovieGrid from "@/components/MovieGrid";
import { useMovies } from "@/hooks/useMovies";
import { Film, Sparkles } from "lucide-react";

const Index = () => {
  const { movies, isLoading, searchMovies } = useMovies();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setHasSearched(true);
    searchMovies(query);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cinema-gradient opacity-20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Film className="w-12 h-12 text-primary" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                CineMuse
              </h1>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover your next favorite movie, series, or episode with our powerful search engine
            </p>
            <MovieSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 pb-20">
        {hasSearched && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Search Results
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>
        )}
        
        <MovieGrid 
          movies={movies} 
          isLoading={isLoading}
          onMovieClick={(id) => {
            console.log("Movie clicked:", id);
            // Future: Navigate to movie details
          }}
        />

        {!hasSearched && !isLoading && (
          <div className="text-center py-20">
            <div className="text-8xl mb-8">🎭</div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Welcome to CineMuse
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your ultimate destination for movie discovery. Search through millions of movies, 
              TV series, and episodes to find your next entertainment obsession.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-card/30 rounded-xl border border-border/50">
                <div className="text-4xl mb-4">🔍</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Smart Search</h4>
                <p className="text-muted-foreground">Find movies by title, year, or genre with our intelligent search</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-border/50">
                <div className="text-4xl mb-4">⭐</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Detailed Info</h4>
                <p className="text-muted-foreground">Get comprehensive details including ratings and cast information</p>
              </div>
              <div className="text-center p-6 bg-card/30 rounded-xl border border-border/50">
                <div className="text-4xl mb-4">🎬</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">All Formats</h4>
                <p className="text-muted-foreground">Explore movies, TV series, documentaries, and more</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;