import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import QRCode from "react-native-qrcode-svg";

type QRCodeDisplayProps = {
  url: string;
  isDarkMode: boolean;
};

const QRCodeDisplay = (props: QRCodeDisplayProps) => {
  const themeStyles = props.isDarkMode ? darkTheme : lightTheme;

  return (
    <ImageBackground
      source={require("../../../assets/background.jpeg")}
      style={styles.container}
    >
      <View style={[styles.qrContainer, themeStyles.qrContainer]}>
        <QRCode value={props.url} />
      </View>
    </ImageBackground>
  );
};

const lightTheme = StyleSheet.create({
  qrContainer: {
    backgroundColor: "#fff",
  },
});

const darkTheme = StyleSheet.create({
  qrContainer: {
    backgroundColor: "#333",
  },
});

const styles = StyleSheet.create({
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 150,
    paddingTop: 400,
    paddingBottom: 400,
  },
});

export default QRCodeDisplay;
