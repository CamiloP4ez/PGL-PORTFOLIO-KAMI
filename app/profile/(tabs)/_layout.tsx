import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MiInfo from "../../../components/MiInfo";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        header: () => <MiInfo></MiInfo>,
      }}
    >
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: () => <Entypo name="list" />,
        }}
      />
      <Tabs.Screen
        name="repository"
        options={{
          title: "Repository",
          tabBarIcon: () => <Entypo name="github" />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
