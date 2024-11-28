import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import "react-native-get-random-values";

type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  inCart: boolean;
};

type Props = {
  product?: Product;
  onSave: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
};

export default function ShoppingForm({ product, onSave, onCancel }: Props) {
  const [name, setName] = useState(product?.name || "");
  const [category, setCategory] = useState(product?.category || "otros");
  const [quantity, setQuantity] = useState(
    product?.quantity ? product.quantity.toString() : "1"
  );
  const [price, setPrice] = useState(
    product?.price ? product.price.toFixed(2) : "0.00"
  );

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "El nombre del producto es obligatorio.");
      return;
    }

    if (isNaN(+quantity) || +quantity <= 0) {
      Alert.alert("Error", "La cantidad debe ser un número mayor a 0.");
      return;
    }

    if (isNaN(+price) || +price < 0) {
      Alert.alert(
        "Error",
        "El precio debe ser un número válido y no negativo."
      );
      return;
    }

    onSave({
      name,
      category,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      inCart: product?.inCart || false,
    });

    setName("");
    setCategory("otros");
    setQuantity("1");
    setPrice("0.00");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del producto:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre del producto"
      />

      <Text style={styles.label}>Categoría:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Panadería" value="panadería" />
          <Picker.Item label="Bebidas" value="bebidas" />
          <Picker.Item label="Enlatados" value="enlatados" />
          <Picker.Item label="Carnes" value="carnes" />
          <Picker.Item label="Pescados" value="pescados" />
          <Picker.Item label="Frutas y Verduras" value="frutas-verduras" />
          <Picker.Item label="Otros" value="otros" />
        </Picker>
      </View>

      <Text style={styles.label}>Cantidad:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Ejemplo: 2"
      />

      <Text style={styles.label}>Precio por unidad (€):</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Ejemplo: 1.99"
      />

      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSave} />
        <Button title="Cancelar" onPress={onCancel} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
