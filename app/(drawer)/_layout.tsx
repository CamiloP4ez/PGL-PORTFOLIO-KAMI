import { StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: true }}>
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
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({});
