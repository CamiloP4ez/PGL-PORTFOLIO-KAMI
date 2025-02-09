import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Modal,
  Button,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { fetchImages, deleteImage } from "../../../services/imageService";
import { getToken } from "../../../services/authService";
import { removeToken } from "../../../services/authService";
import CameraComponent from "../../../components/CameraComponent";
import LoadingSpinner from "../../../components/LoadindSpinner";

const router = useRouter();

const CameraScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        alert("Debes iniciar sesión");
        await removeToken();
        router.replace("/user-management/login");
        return;
      }
      const fetchedImages = await fetchImages(token);
      setImages(fetchedImages);
      setLoading(false);
    };

    loadImages();
  }, []);

  const handleImageCaptured = async (base64Image: string) => {
    setImages((prev) => [...prev, base64Image]); // Actualiza la lista de imágenes
    setShowCamera(false);
  };

  const handleDeleteImage = async (imageId: string) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de que quieres eliminar esta imagen?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: async () => {
            setLoading(true);
            const token = await getToken();
            if (token) {
              await deleteImage(token, imageId);
              setImages((prev) => prev.filter((img) => img !== imageId));
            }
            setLoading(false);
            setSelectedImage(null);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
        Tus Imágenes
      </Text>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={images}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedImage(item)}>
              <Image
                source={{ uri: item }}
                style={{ width: 100, height: 100, margin: 5 }}
              />
            </Pressable>
          )}
        />
      )}

      <Button title="Abrir Cámara" onPress={() => setShowCamera(true)} />

      {selectedImage && (
        <Modal transparent={true} animationType="fade">
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.8)",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "80%" }}
            />
            <Button
              title="Eliminar"
              onPress={() => handleDeleteImage(selectedImage)}
              color="red"
            />
            <Button title="Cerrar" onPress={() => setSelectedImage(null)} />
          </View>
        </Modal>
      )}

      {showCamera && (
        <CameraComponent
          onCapture={handleImageCaptured}
          onClose={() => setShowCamera(false)}
        />
      )}
    </View>
  );
};

export default CameraScreen;
