import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as AuthService from "../services/authService"; // Adjust path if necessary

export default function AppPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AuthService.getToken(); // Get token using AuthService
        if (token) {
          // Token exists, assume it's valid for now (can add validation later)
          router.replace("/(drawer)/welcome-page"); // Use replace to prevent going back to index
        } else {
          router.replace("/user-management/login"); // Use replace for login
        }
      } catch (error) {
        console.error("Error checking token:", error);
        // Handle error appropriately, maybe navigate to login as a fallback
        router.replace("/user-management/login");
      } finally {
        setIsLoading(false); // Set loading to false after check is complete
      }
    };

    checkTokenAndNavigate();
  }, []);

  if (isLoading) {
    return (
      <View style={loadingStyles.container}>
        <Text style={loadingStyles.text}>Cargando...</Text>
      </View>
    );
  }

  // This should ideally not be reached as we are using router.replace in useEffect
  // but as a fallback, in case isLoading is initially false for some reason.
  return (
    <View style={styles.container}>
      <Text>Redireccionando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
  },
});
