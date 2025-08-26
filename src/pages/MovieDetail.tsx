import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Calendar, Clock, Globe, Award } from "lucide-react";

interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const API_KEY = 'd99019f';
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        
        const data = await response.json();
        
        if (data.Response === "True") {
          setMovie(data);
        } else {
          toast({
            title: "Movie not found",
            description: data.Error || "Could not fetch movie details",
            variant: "destructive",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch movie details",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="w-full aspect-[2/3] rounded-lg bg-card/30" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4 bg-card/30" />
              <Skeleton className="h-6 w-1/2 bg-card/30" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-card/30" />
                <Skeleton className="h-4 w-full bg-card/30" />
                <Skeleton className="h-4 w-3/4 bg-card/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden bg-card-gradient border-border/50">
              <CardContent className="p-0">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                  alt={movie.Title}
                  className="w-full aspect-[2/3] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {movie.Title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
                  {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
                </Badge>
                <Badge variant="outline" className="border-border">
                  {movie.Rated}
                </Badge>
                {movie.imdbRating !== 'N/A' && (
                  <Badge variant="secondary" className="bg-cinema-gold/20 text-cinema-gold border-cinema-gold/30">
                    <Star className="w-3 h-3 mr-1" />
                    {movie.imdbRating}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Released}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{movie.Runtime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>{movie.Language}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span>{movie.imdbVotes} votes</span>
                </div>
              </div>
            </div>

            {/* Plot */}
            <Card className="bg-card/30 border-border/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Plot</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.Plot !== 'N/A' ? movie.Plot : 'No plot available.'}
                </p>
              </CardContent>
            </Card>

            {/* Cast & Crew */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Director</h3>
                  <p className="text-muted-foreground">{movie.Director}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Writers</h3>
                  <p className="text-muted-foreground">{movie.Writer}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/30 border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Cast</h3>
                <p className="text-muted-foreground">{movie.Actors}</p>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(', ').map((genre, index) => (
                      <Badge key={index} variant="outline" className="border-border">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Awards</h3>
                  <p className="text-muted-foreground">
                    {movie.Awards !== 'N/A' ? movie.Awards : 'No awards information available.'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <Card className="bg-card/30 border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Box Office</h3>
                  <p className="text-muted-foreground">{movie.BoxOffice}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;