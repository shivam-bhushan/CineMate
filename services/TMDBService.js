// tmdbService.js
import { API_TOKEN } from '@env';

const fetchMoviesAndTVShows = async (page) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };

  try {
    const movieResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options);
    const tvResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`, options);

    if (!movieResponse.ok || !tvResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    return { movies: movieData.results, tvShows: tvData.results };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchMoviesAndTVShows };
