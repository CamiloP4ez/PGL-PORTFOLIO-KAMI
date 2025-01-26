import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as AuthService from "../services/authService";

export default function AppPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AuthService.getToken();
        if (token) {
          router.replace("/(drawer)/welcome-page");
        } else {
          router.replace("/user-management/login");
        }
      } catch (error) {
        console.error("Error checking token:", error);

        router.replace("/user-management/login");
      } finally {
        setIsLoading(false);
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
