import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation,router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Iconify from "react-native-iconify";
import Alert from "@/components/Alert";
import {Canvas, useCanvasRef, Circle} from "@shopify/react-native-skia";

const designCanvas = () => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <SafeAreaView className="flex-1 flex-col relative ">
      {showAlert && (
        <Alert
          description="All your design work will be lost if not saved to drafts before exiting."
          onAccept={() => {
            setShowAlert(false);
            router.push("/(user)/design-studio");
          }}
          onCancel={() => setShowAlert(false)}
          onAcceptText="Dismiss"
          onCancelText="Cancel"
        />
      )}
      <View className="h-full bg-[#9eadffd9] relative ">
        {/* Container 1 */}
        <Canvas className="bg-[#F9F9FB] flex-grow mb-2 m-3 rounded-[24px] relative">
          <View className="flex flex-row justify-between items-center p-4">
            <TouchableOpacity
              className="bg-[#fde0ca] p-[10px] rounded-full"
              onPress={() => setShowAlert(true)}
            >
              <Iconify
                icon="gridicons:cross-small"
                size={30}
                color="#F06038"
                className="text-2xl"
              />
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#fde0ca] p-3 rounded-full">
              <Iconify
                icon="lets-icons:done-round-fill"
                size={27}
                color="#F06038"
                className="text-2xl"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-[#fde0ca] p-4 rounded-full absolute bottom-0 right-0 m-4">
            <Iconify
              icon="icomoon-free:enlarge2"
              size={20}
              color="#F06038"
              className="text-2xl"
            />
          </TouchableOpacity>
        </Canvas>
        {/* Container 2 */}

        <View className="bg-[#F9F9FB] h-44 m-[6px] rounded-[24px] "></View>
      </View>
    </SafeAreaView>
  );
};

export default designCanvas;
