import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../query/store";
import { GlobalProvider } from "@/context/GlobalProvider";

const MainLayout = () => {
  return (
    <Provider store={store}>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
    </Provider>
  );
};

export default MainLayout;
