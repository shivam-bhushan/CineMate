import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { fetchMoviesAndTVShows } from '../services/TMDBService';

const SeriesScreen = () => {
  const [tvShows, setTVShows] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const { tvShows: newTVShows } = await fetchMoviesAndTVShows(page);
      // Append the page number to each TV show ID to ensure uniqueness
      const tvShowsWithUniqueKeys = newTVShows.map(show => ({ ...show, uniqueKey: `${show.id}_${page}` }));
      setTVShows(prevTVShows => [...prevTVShows, ...tvShowsWithUniqueKeys]);
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
        <Text style={styles.heading}>TV Shows</Text>
        <View style={styles.showsContainer}>
          {tvShows.map(show => (
            <TouchableOpacity key={show.uniqueKey} onPress={() => console.log("TV Show clicked:", show.name)}>
              <View style={styles.card}>
                {show.poster_path && (
                  <>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${show.poster_path}` }} style={styles.poster} />
                    <View style={styles.overlay} />
                  </>
                )}
                <Text style={styles.title}>{show.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Load More" onPress={loadMore} style={styles.button} />
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
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  showsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
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
    borderRadius: 8,
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
    fontSize: 16,
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    marginTop: 10,
  },
});

export default SeriesScreen;
