import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
  
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
           <Stack.Screen
          name="design-canvas"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="item-page/[code]/[countryCode]"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
       
      </Stack>

  );
};

export default _layout;