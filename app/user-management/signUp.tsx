import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define types for navigation (assuming you are using Stack Navigator)
type RootStackParamList = {
  Login: undefined; // Assuming 'Login' screen has no params
  // Define other screens and their params if needed
};

// type RegistroUsuarioNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "Login" // Target screen for navigation after registration
// >;

const RegisterPage: React.FC = () => {
  const [nombreCompleto, setNombreCompleto] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //   const navigation = useNavigation<RegistroUsuarioNavigationProp>();

  const validarEmail = (email: string): boolean => {
    // Validación básica de formato de correo electrónico con regex
    const regexEmail: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
  };

  const validarPasswordSegura = (password: string): boolean => {
    // Validación básica de contraseña segura: mínimo 6 caracteres
    return password.length >= 6; // Puedes añadir más criterios de seguridad
  };

  const handleRegistro = async () => {
    if (!nombreCompleto.trim()) {
      Alert.alert("Error", "Por favor, introduce tu nombre completo.");
      return;
    }
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

    if (!validarPasswordSegura(password)) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Simulación de llamada a la API (reemplaza con tu endpoint real)
    try {
      const response = await fetch("https://tu-api.com/registro", {
        // Reemplaza con la URL de tu API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreCompleto,
          email: email,
          password: password,
        }),
      });

      const data: any = await response.json(); // Type 'data' as 'any' or define a specific interface

      if (response.ok) {
        Alert.alert("Registro Exitoso", "Usuario registrado correctamente.", [
          {
            text: "Iniciar Sesión",
            onPress: () => <Link href="./login">¡Quiero registrarme!</Link>,
          }, // Asume que tienes una pantalla 'Login'
        ]);
      } else {
        // Manejar errores de la API y mostrarlos al usuario
        let errorMessage: string =
          "Error en el registro. Por favor, intenta de nuevo.";
        if (data && data.message) {
          errorMessage = data.message; // Intenta obtener un mensaje de error más específico de la API
        }
        Alert.alert("Error de Registro", errorMessage);
      }
    } catch (error: any) {
      // Type 'error' as 'any' or a specific error type if known
      console.error("Error al registrar usuario:", error);
      Alert.alert(
        "Error de Registro",
        "Ocurrió un error al comunicarse con el servidor. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombreCompleto}
        onChangeText={setNombreCompleto}
      />

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

      <Button title="Registrarse" onPress={handleRegistro} />
    </View>
  );
};

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
});

export default RegisterPage;
