import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchMovies = () => {
    if (query) {
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((response) => setResults(response.data))
        .catch((error) => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie..."
        placeholderTextColor="#bbb"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchMovies}
      />
      <ScrollView contentContainerStyle={styles.resultsList}>
        {results.map((item, index) => (
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
  searchBar: {
    backgroundColor: "#333",
    color: "#fff",
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 20,
    flexDirection: "row",
  },
  resultsList: {
    paddingBottom: 20,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // for Android shadow
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    flexWrap: "wrap",
  },
});

export default SearchScreen;
