import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Make sure to install this package

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0); // Initial value for opacity

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Redirect after 3 seconds
    setTimeout(() => {
      navigation.replace("Main");
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={["#2c3e50", "#3498db"]} // Gradient background
      style={styles.container}
    >
      <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
        <Image
          source={require("./assets/movie-icon.jpg")}
          style={styles.image}
        />
      </Animated.View>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Welcome to MovieApp
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    resizeMode: "contain",
  },
  text: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: "center",
  },
});

export default SplashScreen;
