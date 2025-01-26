import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import ListManagerProviders from "../providers/ListManagerProviders";
import Header from "../components/Header";

const _layout = () => {
  return (
    <ListManagerProviders>
      {/* <View style={styles.header}>
        <Header />
      </View> */}
      <View style={styles.body}>
        <View style={{ width: "100%" }}>
          <ImageBackground
            source={require("../assets/background.jpg")}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <Slot />
          </ImageBackground>
        </View>
      </View>
    </ListManagerProviders>
  );
};

export default _layout;

const styles = StyleSheet.create({
  header: {
    flex: 2,
  },
  footer: {
    flex: 1,
  },
  body: {
    flex: 15,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});
