import "dotenv/config"; // This loads your .env file
//Expo automatically detects the expo.config.js file.
//The exported object overrides app.json when you run your Expo app.
import appJson from "./app.json";
export default {
  expo: {
    ...appJson.expo,
    extra: {
      ...appJson.expo.extra,
      EXPO_BACKEND_URL: process.env.EXPO_BACKEND_URL, // ✅ Loaded from .env
    },
  },
};
