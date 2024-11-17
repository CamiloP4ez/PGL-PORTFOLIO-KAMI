import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MiInfo = () => {
  return (
    <View style={styles.profileContainer}>
      <Image style={styles.avatar} source={require("../assets/camilo.jpg")} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>Quien soy?</Text>
        <Text style={styles.text}>
          Soy un estudiante de programación que quiere vivir la vida chilling y
          poder conseguir un teletrabajo que me permita flojear jajaja
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  descriptionContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: "70%",
    backgroundColor: "pink",
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: "#000",
  },
  text: {
    color: "#000",
  },
});

export default MiInfo;
