import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../query/store";

const MainLayout = () => {
  
    return (
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(user)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    );
  
};

export default MainLayout;
