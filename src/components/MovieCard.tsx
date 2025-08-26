import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from "lucide-react";

interface MovieCardProps {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
    imdbRating?: string;
  };
  onClick?: (id: string) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(movie.imdbID);
    }
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-cinema bg-card-gradient border-border/50 sm:hover:scale-105 sm:hover:-translate-y-1 touch-target"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
            alt={movie.Title}
            className="w-full aspect-[2/3] object-cover transition-transform duration-300 sm:group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Mobile-friendly overlay - always visible on mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-background/90 to-transparent sm:transform sm:translate-y-full sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300">
            <Badge variant="secondary" className="mb-1 sm:mb-2 text-xs bg-primary/20 text-primary-foreground border-primary/30">
              {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
            </Badge>
            <h3 className="font-bold text-foreground text-sm sm:text-lg mb-1 line-clamp-2">
              {movie.Title}
            </h3>
            <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{movie.Year}</span>
              {movie.imdbRating && (
                <>
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 text-cinema-gold flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-cinema-gold">{movie.imdbRating}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;