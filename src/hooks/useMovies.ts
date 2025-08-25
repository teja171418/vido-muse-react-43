import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const searchMovies = async (query: string) => {
    setIsLoading(true);
    
    try {
      // Using a demo API key - in production, this should be handled more securely
      const API_KEY = 'd99019f'; // Updated API key
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );
      
      const data: MovieResponse = await response.json();
      
      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
        toast({
          title: "Movies found!",
          description: `Found ${data.Search.length} movies matching "${query}"`,
        });
      } else {
        setMovies([]);
        toast({
          title: "No movies found",
          description: data.Error || `No movies found for "${query}"`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      toast({
        title: "Error",
        description: "Failed to fetch movies. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    movies,
    isLoading,
    searchMovies,
  };
};