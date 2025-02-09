const API_URL = "http://192.168.1.138:5000";

export const fetchImages = async (token: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/images/get-all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error("Error obteniendo imágenes:", error);
    return [];
  }
};

export const saveImage = async (
  token: string,
  base64: string,
  width: number,
  height: number
) => {
  try {
    const response = await fetch(`${API_URL}/images/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        width,
        height,
        encodedData: base64,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar la imagen");
    }

    return await response.json();
  } catch (error) {
    console.error("Error guardando imagen:", error);
  }
};

export const deleteImage = async (token: string, imageId: string) => {
  try {
    const response = await fetch(`${API_URL}/images/${imageId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la imagen");
    }
  } catch (error) {
    console.error("Error eliminando imagen:", error);
  }
};
