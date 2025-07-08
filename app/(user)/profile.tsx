import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Modal } from "@/components";
import { GlobalContext } from "@/context/GlobalProvider";
import { UserSettings } from "@/components";
import { useRouter } from "expo-router";

const Profile = () => {
  const [fontsLoaded] = useFonts({
    "poppins-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });
  const router = useRouter();
  const translate = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));
  const [showModal, setShowModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { userData } = useContext(GlobalContext)!;
  useEffect(() => {
    translate.value = withTiming(isEditingProfile ? -screenWidth : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [isEditingProfile]);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  if (!fontsLoaded) return;

  return (
    <SafeAreaView className="bg-[#9eadffd9] relative" style={{ flex: 1 }}>
      <UserSettings
        setIsEditingProfile={setIsEditingProfile}
        isEditingProfile={isEditingProfile}
      />
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor="#9eadffd9"
      />

      <Modal showModal={showModal} setShowModal={setShowModal} />

      <Animated.View
        style={[
          animatedStyles,
          {
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: screenHeight,
            paddingBottom: 160,
          },
        ]}
      >
        <View className="flex flex-row justify-between mt-10 ">
          <TouchableOpacity
            className={`rounded-full bg-[#222831] w-16 h-16  mx-5 flex items-center justify-center
            `}
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color="#9eadff" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`bg-[#222831] rounded-full w-16 h-16  mx-5 flex items-center justify-center
            `}
            onPress={() => setIsEditingProfile(true)}
          >
            <FontAwesome name="pencil" size={24} color="#9eadff" />
          </TouchableOpacity>
        </View>
        <View
          className={`bg-[#fafafa] relative top-20 mx-5 flex-grow mb-7 rounded-[40px]`}
        >
          <Image
            className="w-36 h-36 rounded-full bg-pink-100 bg-contain self-center absolute top-[-70px] shadow-lg"
            source={require("../../assets/images/avatar-pfp.jpg")}
          />

          <View className="px-2 mt-20">
            <Text className="text-2xl font-bold text-center font-poppins-medium">
              {userData?.name}
            </Text>
            <Text className="text-center italic">{userData?.description}</Text>
            <View className="flex flex-row justify-between mt-5">
              <Text className="text-xl font-medium  pl-6">Interests</Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text className="text-gray-500 underline pr-6">Edit</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center flex-wrap mt-5 ">
              {userData?.interests?.map((item, index) => (
                <View
                  key={index}
                  className={` rounded-full px-4 py-2 mr-2 mb-2 bg-[#fbe1cd88]  border-[1px]  border-[#a3693c]`}
                >
                  <Text className="font-interTight-medium text-[#a3693c] text-center">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text className=" mb-6  font-medium text-xl mt-10 pl-6 font-poppins-medium">
            Drafts
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Profile;
