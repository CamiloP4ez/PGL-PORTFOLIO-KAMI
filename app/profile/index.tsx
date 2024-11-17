import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const index = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default index;

const styles = StyleSheet.create({});
