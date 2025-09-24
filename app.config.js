import "dotenv/config";

export default {
  expo: {
    name: "Vistyle",
    slug: "vistyl",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    android: {
      package: "com.aneesafatima.vistyl",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.aneesafatima.vistyl",
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: [
      [
        "expo-secure-store",
        {
          configureAndroidBackup: true,
          faceIDPermission:
            "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
        },
      ],
      "expo-font",
      "expo-router",
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "2c8d8013-3d78-4af8-87d0-b41b80b81e68",
      },
      EXPO_BACKEND_URL: process.env.EXPO_BACKEND_URL,
      EXPO_RAPID_API_KEY: process.env.EXPO_RAPID_API_KEY,
      EXPO_RAPID_API_HOST: process.env.EXPO_RAPID_API_HOST,
    },
    owner: "aneesafatima",
  },
};
