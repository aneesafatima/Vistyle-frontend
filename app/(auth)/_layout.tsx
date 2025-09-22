import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
       
      </Stack>
    </>
  );
};

export default _layout;