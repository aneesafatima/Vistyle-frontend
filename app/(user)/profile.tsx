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
//make a different import file for icons\
//REFACTOR
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { Modal } from "@/components";
import { GlobalContext } from "@/context/GlobalProvider";
import { UserSettings } from "@/components";

// ///////////////////////////////////////////////////////////////////////////////////

const Profile = () => {
  const [fontsLoaded] = useFonts({
    "poppins-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
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
  if (!fontsLoaded) return;

  useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor="transparent"
      />
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <UserSettings
          setIsEditingProfile={setIsEditingProfile}
          isEditingProfile={isEditingProfile}
        />

        <Animated.View style={[animatedStyles, { position: "relative" }]}>
          <View className="flex flex-row justify-between  pt-6 absolute w-screen  h-screen bg-[#9eadffd9]">
            <TouchableOpacity
              className={`  rounded-full bg-[#f2f2f2] w-16 h-16  mx-5 flex items-center justify-center
            `}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

            <Pressable
              className={`bg-[#222831] rounded-full w-16 h-16  mx-5 flex items-center justify-center
            `}
              onPress={() => setIsEditingProfile(true)}
            >
              <FontAwesome name="pencil" size={24} color="#f2f2f2" />
            </Pressable>
          </View>
          <View
            className={`bg-white relative top-40 mx-3  rounded-3xl`}
            style={{ height: screenHeight - 160 }}
          >
            {/* <View className="mt-7 mx-2 flex flex-row relative items-center py-5 justify-center rounded-xl shadow-md ">
              <Image
                className="w-32 h-32 rounded-full bg-pink-100 m-2 bg-contain self-center"
                source={require("../../assets/images/avatar-pfp.jpg")}
              />
              <View className="ml-5 font-interTight-regular flex flex-col justify-center">
                <Text className="text-2xl font-bold text-center mb-2">
                  {userData?.name}
                </Text>
                <Text className="text-center italic">
                  {userData?.description}
                </Text>
                <Text className="text-center text-sm w-36 border border-[#3f4f84] font-medium text-[#3f4f84] self-center rounded-full bg-[#c9d3f53b] my-3 py-2">
                  {userData?.designHouse}
                </Text>
              </View>
            </View> */}
            <Image
              className="w-32 h-32 rounded-full bg-pink-100 m-2 bg-contain self-center absolute top-[-70px] shadow-lg"
              source={require("../../assets/images/avatar-pfp.jpg")}
            />

            <View className="px-2 mt-16">
              <Text className="text-2xl font-bold text-center mb-2 font-interTight-regular ">
                {userData?.name}
              </Text>
              <Text className="text-center italic">
                {userData?.description}
              </Text>
              <View className="flex flex-row justify-between mt-5">
                <Text className="text-xl font-medium">Interests</Text>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Text className="text-gray-500 underline">Edit</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center flex-wrap mt-5 ">
                {userData?.interests?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className={` rounded-full px-4 py-2 mr-2 mb-2 bg-[#fbe1cd88]  border-[1px]  border-[#a3693c]`}
                  >
                    <Text className="font-interTight-medium text-[#a3693c] text-center">
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Text className=" mb-6 font-inter-medium font-medium text-xl mt-10 px-2">
              Content Overview
            </Text>
            {/* <View className={`justify-center mt-8 flex flex-row flex-wrap gap-2`}>
            {(showAllCreations ? defaultCreations : defaultCollections).map(
              (item, index) => (
                <Image
                  key={index} // Add the key attribute
                  source={require("../../assets/images/iconic (1).jpg")}
                  resizeMode="contain"
                  className="bg-gray-200 rounded-md w-48 h-60 px-4 py-2"
                />
              )
            )}
          </View> */}

            <View className="flex-row justify-center flex-wrap gap-3 px-4">
              <View className=" bg-[#a9b5f781] border-[1px] border-[#a9b5f7b3]  rounded-xl p-4 w-36">
                <AntDesign name="hearto" size={24} color="#000" />
                <Text className="text-xl font-bold">45</Text>
                <Text>Liked Posts</Text>
              </View>

              <View className=" bg-[#bdd07166] border-[1px] border-[#bdd071af] rounded-xl w-36 p-4">
                <Feather name="lock" size={24} color="#000" />
                <Text className="text-xl font-bold">10</Text>
                <Text>Saved Posts</Text>
              </View>
              <View className=" bg-[#f3886a6c] border-[1px] border-[#f3886a86]  rounded-xl w-36 p-4">
                <MaterialIcons name="drafts" size={24} color="#000" />
                <Text className="text-xl font-bold">5</Text>
                <Text>Drafts</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
