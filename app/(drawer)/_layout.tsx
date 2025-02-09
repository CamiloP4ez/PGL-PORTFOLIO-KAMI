import { StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: true }}>
        <Drawer.Screen
          name="welcome-page"
          options={{
            drawerLabel: "Welcome",
            title: "WELCOME TO THE APP",
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Home",
            title: "¡Bienvenido!",
          }}
        />
        <Drawer.Screen
          name="shopping/index"
          options={{
            drawerLabel: "Shopping List",
            title: "Lista de compras",
          }}
        />
        <Drawer.Screen
          name="camera/index"
          options={{
            drawerLabel: "camara",
            title: "camareando",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({});
