import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import * as AuthService from "../../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const validarEmail = (email: string): boolean => {
    const regexEmail: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor, introduce tu correo electrónico.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Por favor, introduce tu contraseña.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Error", "Formato de correo electrónico no válido.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.138:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          pswd: password,
        }),
      });

      console.log("Response Status:", response.status);
      const data: any = await response.json();
      console.log("Response Data:", data);

      if (response.status == 201) {
        const token = data.object.token;
        if (token) {
          await AuthService.storeToken(token);
          Alert.alert("Login Exitoso", "Bienvenido!", [
            {
              text: "Continuar",
              onPress: () => router.navigate("/(drawer)/welcome-page"),
            },
          ]);
        } else {
          Alert.alert(
            "Error de Login",
            "Respuesta del servidor inesperada. Token no encontrado."
          );
        }
      } else if (response.status == 401) {
        Alert.alert(
          "Error de Login",
          "Email o contraseña incorrectos. Por favor, verifica tus credenciales."
        );
      } else if (response.status == 400) {
        Alert.alert(
          "Error de Login",
          "Petición incorrecta. Por favor, revisa los datos de inicio de sesión."
        );
      } else {
        let errorMessage = "Error de Login. Por favor, intenta de nuevo.";
        if (data && data.message) {
          errorMessage = data.message;
        }
        Alert.alert("Error de Login", errorMessage);
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert(
        "Error de Login",
        "Ocurrió un error al comunicarse con el servidor. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Iniciar Sesión" onPress={handleLogin} />

      <View style={styles.registerLinkContainer}>
        <Text>¿No tienes una cuenta?</Text>
        <Link href="./signUp" style={styles.registerLink}>
          ¡Quiero registrarme!
        </Link>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  registerLinkContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  registerLink: {
    marginLeft: 5,
    color: "blue",
  },
});
