import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { v4 as uuid } from "uuid";
import ShoppingForm from "../../components/ShoppingForm";

type Product = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  inCart: boolean;
};

export default function ShoppingScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Calcular el precio total
  const totalPrice = products
    .filter((product) => !product.inCart)
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...newProduct }
            : product
        )
      );
      setEditingProduct(null); // Finaliza la edición
    } else {
      setProducts((prev) => [
        ...prev,
        { id: uuid(), ...newProduct }, // Agregar un nuevo producto
      ]);
    }
    setIsModalVisible(false); // Cierra el modal
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true); // Abre el modal para editar
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
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
            <Text style={styles.productName}>
              {item.name} ({item.quantity})
            </Text>
            <Text style={styles.productDetails}>
              €{item.price.toFixed(2)} - {item.category}
            </Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => handleEditProduct(item)} />
              <Button
                title="Eliminar"
                color="red"
                onPress={() => handleDeleteProduct(item.id)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            ¡No hay productos en tu lista de la compra!
          </Text>
        }
      />

      <Button
        title="Añadir Producto"
        onPress={() => {
          setEditingProduct(null); // Limpia cualquier edición previa
          setIsModalVisible(true);
        }}
      />

      <Button
        title="Borrar Todo"
        onPress={handleClearList}
        disabled={products.length === 0}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <ShoppingForm
            product={editingProduct || undefined} // Puede ser undefined
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
});
