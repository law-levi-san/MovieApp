import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; // For search icon

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#fff"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Movies..."
          placeholderTextColor="#bbb"
          onFocus={() => navigation.navigate("Search")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.movieList}>
        {movies.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.movieCard}
            onPress={() => navigation.navigate("Details", { movie: item.show })}
          >
            <Image
              source={{ uri: item.show.image?.medium }}
              style={styles.thumbnail}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.title}>{item.show.name}</Text>
              <Text numberOfLines={3} style={styles.summary}>
                {item.show.summary?.replace(/<[^>]+>/g, "")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background color for a modern look
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    marginHorizontal: 15,
    borderRadius: 30,
    paddingLeft: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    padding: 0,
  },
  movieList: {
    paddingBottom: 20,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    margin: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // for Android shadow
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 5,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
    flexShrink: 1, // Prevent overflow and allow text wrapping
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  summary: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 5,
    flexWrap: "wrap", // Allow wrapping for longer descriptions
  },
});

export default HomeScreen;
