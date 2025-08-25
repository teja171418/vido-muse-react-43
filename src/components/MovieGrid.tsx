import MovieCard from "./MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onMovieClick?: (id: string) => void;
}

const MovieGrid = ({ movies, isLoading, onMovieClick }: MovieGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="w-full aspect-[2/3] rounded-lg bg-card/30" />
            <Skeleton className="h-4 w-3/4 bg-card/30" />
            <Skeleton className="h-3 w-1/2 bg-card/30" />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">No movies found</h3>
        <p className="text-muted-foreground">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;