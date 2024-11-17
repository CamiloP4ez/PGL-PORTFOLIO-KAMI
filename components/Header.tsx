import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useContext } from "react";
import { COLORS } from "../styles/Color";
import { ListManagerContext } from "../contexts/ListManagerContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
const Header = () => {
  const listManager = useContext(ListManagerContext);
  return (
    <View style={styles.header}>
      <Link href="/">
        <Entypo name="home" />
        <Text style={styles.headerText}>Camilo App</Text>
      </Link>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 0,
    marginLeft: 10,
  },
  Pressable: {
    backgroundColor: COLORS.primary,
    marginTop: 30,
    padding: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  textButton: {
    fontWeight: "bold",
  },
  PressableOnLongPress: {
    backgroundColor: COLORS.secondary,
  },
  touchable: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },

  touchableButton: {
    backgroundColor: "#2196F3",
    padding: 5,
    borderRadius: 5,
  },
});
