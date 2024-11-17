import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

type LikesListProps = {
  isDarkMode: boolean;
};

const LikesList = (props: LikesListProps) => {
  const likes = [
    "Caminar por el everest",
    "Ver anime",
    "one piece",
    "unas carnitas",
    "los videojuegos",
    "viajar por peru",
    "conocer japon",
    "rap de negros",
    "series",
    "ducharme 20 veces al dia",
    "jugar con amigos",
    "cenas romanticas con abuelas",
  ];

  const themeStyles = props.isDarkMode ? darkTheme : lightTheme;

  return (
    <ScrollView style={styles.scrollContainer}>
      {likes.map((like, index) => (
        <Text key={index} style={[styles.likeText, themeStyles.likeText]}>
          {like}
        </Text>
      ))}
    </ScrollView>
  );
};

const lightTheme = StyleSheet.create({
  likeText: {
    backgroundColor: "#33ffd4",
    color: "darkred",
  },
});

const darkTheme = StyleSheet.create({
  likeText: {
    backgroundColor: "#444",
    color: "#ffb3b3",
  },
});

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  likeText: {
    borderColor: "yellow",
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LikesList;
