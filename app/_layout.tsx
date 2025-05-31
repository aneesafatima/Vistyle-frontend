// @@iconify-code-gen
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../query/store";
import { GlobalProvider } from "@/context/GlobalProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MainLayout = () => {
  return (
    <Provider store={store}>
      <GlobalProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </GlobalProvider>
    </Provider>
  );
};

export default MainLayout;
