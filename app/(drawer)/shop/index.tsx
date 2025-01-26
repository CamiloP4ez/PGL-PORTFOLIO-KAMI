import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  Alert,
  Image,
  Switch,
} from "react-native";
import { v4 as uuid } from "uuid";
import ShoppingForm from "../../../components/ShoppingForm";

const categoryImages: { [key: string]: any } = {
  panadería: require("../../../assets/categories/bakery.jpg"),
  bebidas: require("../../../assets/categories/beverages.jpg"),
  enlatados: require("../../../assets/categories/canned.png"),
  carnes: require("../../../assets/categories/meat.jpg"),
  pescados: require("../../../assets/categories/fish.jpg"),
  "frutas-verduras": require("../../../assets/categories/produce.jpg"),
  otros: require("../../../assets/categories/others.jpg"),
};

type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  inCart: boolean;
  selected: boolean;
};

export default function ShoppingScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getCategoryImage = (category: string): any => {
    const normalizedCategory = category.trim().toLowerCase();
    return categoryImages[normalizedCategory] || categoryImages["otros"];
  };

  const totalPrice = products
    .filter((product) => product.selected)
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);

  const handleAddProduct = (newProduct: Omit<Product, "id" | "selected">) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...newProduct }
            : product
        )
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [
        ...prev,
        { id: uuid(), ...newProduct, selected: true },
      ]);
    }
    setIsModalVisible(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleToggleSelection = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const handleClearList = () => {
    Alert.alert(
      "¿Borrar todo?",
      "¿Estás seguro de que deseas eliminar todos los elementos de la lista?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Borrar",
          style: "destructive",
          onPress: () => setProducts([]),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de la compra</Text>
      <Text style={styles.totalPrice}>Total: €{totalPrice}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image
              source={getCategoryImage(item.category)}
              style={styles.productImage}
            />

            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {item.name} ({item.quantity})
              </Text>
              <Text style={styles.productDetails}>
                €{item.price.toFixed(2)} - {item.category}
              </Text>
            </View>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => handleEditProduct(item)} />
              <Button
                title="Eliminar"
                color="red"
                onPress={() => handleDeleteProduct(item.id)}
              />
              <View style={styles.switchContainer}>
                <Text>{item.selected ? "✔️" : "❌"}</Text>
                <Switch
                  value={item.selected}
                  onValueChange={() => handleToggleSelection(item.id)}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            ¡No hay productos en tu lista de la compra!
          </Text>
        }
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Añadir Producto"
            onPress={() => {
              setEditingProduct(null);
              setIsModalVisible(true);
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Borrar Todo"
            onPress={handleClearList}
            disabled={products.length === 0}
          />
        </View>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <ShoppingForm
            product={editingProduct || undefined}
            onSave={handleAddProduct}
            onCancel={() => setIsModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFAF0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#222",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#00FFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDetails: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
