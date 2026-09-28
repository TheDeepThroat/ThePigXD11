import React, { useState, useEffect } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LoginScreen from './components/LoginScreen';
import MovieModal from './components/MovieModal';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    fetch("APIMONGO_URL")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <LoginScreen onLogin={setLoggedInUser} />;
  }

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffcc00" />
        <Text style={styles.loadingText}>Cargando películas...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable
        accessibilityLabel={`Ver detalles de ${item.title}`}
        accessibilityRole="button"
        onPress={() => setSelectedMovie(item)}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
      >
        {item.poster ? (
          <Image
            source={{ uri: item.poster }}
            style={styles.poster}
          />
        ) : (
          <View style={[styles.poster, styles.noImageContainer]}>
            <Text style={styles.noImageText}>Sin imagen</Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.plot} numberOfLines={4}>
            {item.fullplot || "Sin descripción disponible."}
          </Text>

          <Text style={styles.detailsText}>
            Ver detalles →
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          🎬 SAMPLE MFLIX
        </Text>

        <Text style={styles.headerSubtitle}>
          Películas disponibles
        </Text>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <MovieModal
        movie={selectedMovie}
        visible={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    paddingTop: 45,
  },

  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
  },

  loadingText: {
    marginTop: 12,
    color: '#dddddd',
    fontSize: 15,
    fontWeight: '500',
  },

  header: {
    backgroundColor: '#202020',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ffcc00',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
  },

  headerSubtitle: {
    fontSize: 13,
    color: '#aaaaaa',
    textAlign: 'center',
    marginTop: 5,
  },

  listContainer: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 25,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#242424',
    borderRadius: 16,
    marginBottom: 16,
    padding: 10,

    borderWidth: 1,
    borderColor: '#333333',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  poster: {
    width: 100,
    height: 145,
    borderRadius: 10,
    backgroundColor: '#383838',
  },

  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555555',
  },

  noImageText: {
    color: '#999999',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  infoContainer: {
    flex: 1,
    paddingLeft: 14,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },

  plot: {
    fontSize: 13,
    color: '#bbbbbb',
    lineHeight: 19,
  },

  detailsText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#ffcc00',
  },
});
