// MoviesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { fetchMoviesAndTVShows } from '../services/TMDBService';

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const { movies: newMovies } = await fetchMoviesAndTVShows(page);

      const moviesWithUniqueKeys = newMovies.map(movie => ({ ...movie, uniqueKey: `${movie.id}_${page}` }));
      setMovies(prevMovies => [...prevMovies, ...moviesWithUniqueKeys]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
      <View>
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.heading}>Movies</Text>
      <View style={styles.moviesContainer}>
        {movies.map(movie => (
          <TouchableOpacity key={movie.uniqueKey} onPress={() => console.log("Movie clicked:", movie.title)}>
            <View style={styles.card}>
              {movie.poster_path && (
                <>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={styles.poster} />
                  <View style={styles.overlay} />
                </>
              )}
              <Text style={styles.title}>{movie.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Load More" onPress={loadMore} style = {styles.button}/>
    </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    paddingHorizontal: 20, 
    paddingVertical: 2, 
    backgroundColor: '#9d0208',
    borderColor: '#d9d9d9', 
    borderWidth: 1.5, 
    borderRadius: 16, 
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    margin: 10,
    alignItems: 'center',
    position: 'relative',
    width: 150,
    height: 250, 
  },
  poster: {
    width: 150,
    height: 250, 
    marginBottom: 10,
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    borderRadius: 8, 
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    flexWrap: 'wrap', 
    color: 'white', 
    fontWeight: 'bold',
    paddingHorizontal: 10, 
    borderRadius: 8,  
    top: 18,
    fontSize: 16
  },
  button:{
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#131112',
    borderColor: 'white',
    paddingHorizontal:30,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    marginTop: 10,
  }
});

export default MoviesScreen;
