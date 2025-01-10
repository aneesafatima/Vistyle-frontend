import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
 //make request to the server 
  //protect this route and all under it 
  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="photo-upload"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack>
    </>
  );
};

export default _layout;