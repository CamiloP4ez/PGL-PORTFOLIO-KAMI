import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Redirect, router } from "expo-router";

const RegisterPage: React.FC = () => {
  const [nombreCompleto, setNombreCompleto] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validarEmail = (email: string): boolean => {
    const regexEmail: RegExp =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
  };

  const validarPasswordSegura = (password: string): boolean => {
    const regexPassword: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regexPassword.test(password);
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
      Alert.alert(
        "Error",
        "La contraseña no cumple con los criterios de seguridad. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
      );
      return;
    }

    try {
      const response = await fetch("http://192.168.1.138:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: nombreCompleto,
          email: email,
          pswd: password,
        }),
      });

      const data: any = await response.json();

      if (response.status === 201) {
        Alert.alert("Registro Exitoso", "Usuario registrado correctamente.");
        router.navigate("user-management/login");
      } else if (response.status === 400) {
        Alert.alert(
          "Error de Registro",
          "Error en la petición. Por favor, revisa los datos."
        );
      } else if (response.status === 409) {
        Alert.alert(
          "Error de Registro",
          "Ya existe un usuario registrado con este correo electrónico."
        );
      } else {
        let errorMessage: string =
          "Error en el registro. Por favor, intenta de nuevo.";
        if (data && data.message) {
          errorMessage = data.message;
        }
        Alert.alert("Error de Registro", errorMessage);
      }
    } catch (error: any) {
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
      <View style={{ marginTop: 20 }}>
        <Button
          title="Iniciar Sesión"
          onPress={() => router.navigate("user-management/login")}
        />
      </View>
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
