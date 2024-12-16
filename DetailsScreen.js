import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>
        {movie.summary?.replace(/<[^>]+>/g, "")}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for modern look
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Adds shadow for Android
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  summary: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default DetailsScreen;
