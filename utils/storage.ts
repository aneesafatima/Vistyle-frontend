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

export async function removeToken() {
  try {
    console.log("Removing token");
    await AsyncStorage.removeItem("userToken");
    return true;
  } catch (error) {
    console.error("Error removing token:", error);
    return false;
  }
}
