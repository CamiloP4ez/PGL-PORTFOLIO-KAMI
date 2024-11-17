import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ListManagerContext } from "../contexts/ListManagerContext";

type ListManagerProvidersProps = {
  children: React.ReactNode;
};

const ListManagerProviders = ({ children }: ListManagerProvidersProps) => {
  const [clickCounter, setclickCounter] = useState(0); // los useStatenuevamete
  const [isListRendered, setIsListRendered] = useState<boolean>(false);
  const handleClick = () => {
    setclickCounter(clickCounter + 1);
    console.log("Has presionao el button :o " + clickCounter + " veces!");
    setIsListRendered(!isListRendered);
  };
  return (
    <ListManagerContext.Provider
      value={{ isListRendered, handleClick, clickCounter }}
    >
      {children}
    </ListManagerContext.Provider>
  );
};

export default ListManagerProviders;

const styles = StyleSheet.create({});
