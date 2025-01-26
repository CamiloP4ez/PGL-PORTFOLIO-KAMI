import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import "react-native-get-random-values";

export default function AppPage() {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={require("../../assets/luffy.png")} />
      <ExpoStatusBar style="auto" />
      <Text style={styles.welcomeText}>Bienvenido Nakama!</Text>

      <Link href="./profile" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Ver mi perfil</Text>
        </Pressable>
      </Link>

      <Link href="./shopping" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Ir a la lista de compras</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 400,
    height: 400,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333333",
    marginVertical: 15,
    textAlign: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
  button: {
    backgroundColor: "#4A00E0",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonPressed: {
    backgroundColor: "#3A00B2",
  },
  buttonText: {
    color: "#333333",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
