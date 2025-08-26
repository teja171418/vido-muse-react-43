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
        <div className="relative container mx-auto safe-area-padding px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Film className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary flex-shrink-0" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                CineMuse
              </h1>
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent flex-shrink-0" />
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Discover your next favorite movie, series, or episode with our powerful search engine
            </p>
            <MovieSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto safe-area-padding px-4 pb-16 sm:pb-20">
        {hasSearched && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Search Results
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
          </div>
        )}
        
        <MovieGrid 
          movies={movies} 
          isLoading={isLoading}
          onMovieClick={(id) => {
            window.location.href = `/movie/${id}`;
          }}
        />

        {!hasSearched && !isLoading && (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-6 sm:mb-8">🎭</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-4">
              Welcome to CineMuse
            </h3>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Your ultimate destination for movie discovery. Search through millions of movies, 
              TV series, and episodes to find your next entertainment obsession.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
              <div className="text-center p-4 sm:p-6 bg-card/30 rounded-xl border border-border/50 mobile-shadow">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">Smart Search</h4>
                <p className="text-sm sm:text-base text-muted-foreground">Find movies by title, year, or genre with our intelligent search</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-card/30 rounded-xl border border-border/50 mobile-shadow">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⭐</div>
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">Detailed Info</h4>
                <p className="text-sm sm:text-base text-muted-foreground">Get comprehensive details including ratings and cast information</p>
              </div>
              <div className="text-center p-4 sm:p-6 bg-card/30 rounded-xl border border-border/50 mobile-shadow sm:col-span-2 lg:col-span-1">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎬</div>
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">All Formats</h4>
                <p className="text-sm sm:text-base text-muted-foreground">Explore movies, TV series, documentaries, and more</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;