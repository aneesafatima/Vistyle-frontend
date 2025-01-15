import AsyncStorage from "@react-native-async-storage/async-storage";
export async function saveToken(token: string) {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export async function getToken() {
  try {
    let value = await AsyncStorage.getItem("userToken");
    return value;
  } catch (error) {
    console.error("Error getting token:", error);
  }
}
