const OMDB_API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
const OMDB_BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async ({
  query,
}: {
  query?: string;
}): Promise<OmdbMovie[]> => {
  let endpoint: string;
  if (query && query.trim() !== "") {
    endpoint = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`;
  } else {
    endpoint = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=movie&type=movie`;
  }
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found");
  }
  return data.Search;
};

export const fetchMovieDetails = async (
  imdbID: string
): Promise<OmdbMovieDetails> => {
  const endpoint = `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }
  const data = await response.json();
  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }
  return data;
};