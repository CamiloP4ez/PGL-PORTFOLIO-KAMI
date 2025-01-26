import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import "react-native-get-random-values";
import * as AuthService from "../../services/authService";

export default function AppPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AuthService.removeToken();
      router.replace("/user-management/login");
    } catch (error) {
      console.error("Error during logout in AppPage:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error al cerrar sesión. Por favor, intenta de nuevo."
      );
    }
  };
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
      <Pressable
        style={({ pressed }) => [
          styles.buttonLogout,
          pressed && styles.buttonLogoutPressed,
        ]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonLogoutText}>Cerrar Sesión</Text>
      </Pressable>
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
  buttonLogout: {
    backgroundColor: "#FF5733",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonLogoutPressed: {
    backgroundColor: "#CC462A",
  },
  buttonLogoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
