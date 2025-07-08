import { View, Image, Text } from "react-native";
import React from "react";
import FeatureBox from "./FeatureBox";

const HomeContent = () => {
  return (
    <View className="flex flex-col h-full pb-[170px]">
      <View className="w-full h-64 items-center justify-center relative top-4 ">
        {/* Back Card - Tilted */}
        <View className="w-96 h-60 bg-[#5f5dbdaf] rounded-[50px] top-6 absolute -rotate-1">
          <Image
            source={require("../assets/images/home-page-img.png")}
            className=" w-[250px] h-full absolute -right-14 -top-10 "
          />
        </View>

        {/* Front Card */}
        <View className="w-96 h-60 bg-[#9eadffa8] rounded-[50px] rotate-3 relative px-10">
          <View className="mt-7 flex flex-col justify-center -rotate-3">
            <Text className="text-3xl font-interTight-medium  text-[#fafafa] tracking-widest">
              Welcome to {"\n"} Vistyle!
            </Text>
            <Text className="w-40 text-sm font-interTight-regular mt-3 text-[#fafafa] tracking-wider">
              Your space to <Text className="text-[#f1b963]">visualize</Text>{" "}
              outfits, explore <Text className="text-[#f1b963]">styles</Text>,
              and <Text className="text-[#f1b963]">shop</Text> with ease. Let’s
              create something beautiful together.
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row px-3 ">
        <FeatureBox
          color="#f1b963"
          icon="material-symbols-light:emoji-people"
          iconColor="#876464"
          borderColor="#d99a3c"
          text={`Community\nComing\nSoon`}
          bgColor="#f1b86390"
        />
        <FeatureBox
          color="#9eadff"
          icon="material-symbols-light:info-i-rounded"
          iconColor="#f9f9f9"
          borderColor="#7d90ffa8"
          text={`Give\nFeedback\n`}
          bgColor="#9eadffa8"
        />
      </View>
      <View className="flex-grow rounded-[40px] mt-3 mx-8 mb-2 relative border-[1px] border-[#e2e2e2e6] bg-[#e2e2e288] p-6">
        <Text className="font-poppins-medium text-[#959595]">
          Design Studio in work
        </Text>
      </View>
    </View>
  );
};

export default HomeContent;
