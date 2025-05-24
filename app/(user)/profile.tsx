import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
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
import { fashionInterestColors } from "../../assets/ui-data/colors";
import { InterestsModal } from "@/components";
import { GlobalContext } from "@/context/GlobalProvider";
import { UserSettings } from "@/components";

// ///////////////////////////////////////////////////////////////////////////////////

const Profile = () => {
  const [fontsLoaded] = useFonts({
    "poppins-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });
  const { width: screenWidth } = Dimensions.get("window");
  const translate = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));
  const [showCollections, setShowCollections] = useState(false);
  const [showAllCreations, setshowAllCreations] = useState(true);
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
  let defaultCollections = ["C-1", "C-2", "C-3", "C-4"];
  let defaultCreations = ["A-1"];
  return (
    <SafeAreaView className="bg-white h-screen pt-8">
      <InterestsModal showModal={showModal} setShowModal={setShowModal} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        scrollEnabled={!isEditingProfile}
        className="relative "
      >
        <UserSettings
          setIsEditingProfile={setIsEditingProfile}
          isEditingProfile={isEditingProfile}
        />
        <Animated.View style={animatedStyles}>
          <View className="flex flex-row justify-between items-center ">
            <TouchableOpacity
              className={`  rounded-full bg-[#f2f2f2] w-16 h-16 mt-10 mx-5 flex items-center justify-center
            `}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text
              className={`text-3xl text-center mt-10 font-bold font-inter-medium `}
            >
              Profile
            </Text>
            <Pressable
              className={`bg-[#f2f2f2] rounded-full w-16 h-16 mt-10 mx-5 flex items-center justify-center
            `}
              onPress={() => setIsEditingProfile(true)}
            >
              <FontAwesome name="pencil" size={24} color="black" />
            </Pressable>
          </View>
          <View className="flex flex-row relative justify-center  mt-5 ">
            {/* <Image className="w-40 top-1/2 -translate-y-1/2 absolute -left-[70px] bg-yellow-100 h-40  rounded-2xl my-2 rotate-[20deg]"></Image> */}
            <Image
              className="w-44 bg-pink-100 h-44 rounded-3xl my-2 self-center shadow-md"
              source={require("../../assets/images/pfp-demo-1.jpg")}
            />
            {/* <Image className="w-40 top-1/2 -translate-y-1/2  absolute -right-[70px] bg-blue-100 h-40 rounded-2xl my-2 -rotate-[20deg]"></Image> */}
          </View>
          <View>
            <Text className="text-4xl font-bold text-center mt-8 font-poppins-medium mb-2">
              John Doe
            </Text>
            <Text className="text-center text-md text-gray-500 mb-2">
              #TheMinimalist
            </Text>
            <Text className="text-center font-interTight-regular italic">
              {userData?.description}
            </Text>
          </View>
          <View className="mx-8">
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
                  className={` rounded-full px-4 py-2 mr-2 mb-2 bg-[#fcd9be88]  border-2 text-[#FCD9BE] border-[#FCD9BE]`}
                >
                  <Text
                    className="font-interTight-medium  text-center"
                    style={{ color: fashionInterestColors[item].text }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Text className=" mb-6 font-inter-medium font-medium text-xl mt-10 px-8">
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

          <View className="flex-row justify-between flex-wrap gap-3 px-4">
            <View className="flex-1 bg-[#8c9dff81] rounded-xl p-4">
              <AntDesign name="hearto" size={24} color="#000" />
              <Text className="text-xl font-bold">45</Text>
              <Text>Liked Posts</Text>
            </View>

            <View className="flex-1 bg-[#afc94766] rounded-xl p-4">
              <Feather name="lock" size={24} color="#000" />
              <Text className="text-xl font-bold">10</Text>
              <Text>Saved Posts</Text>
            </View>
            <View className="flex-1 bg-[#f467406c] rounded-xl p-4">
              <MaterialIcons name="drafts" size={24} color="#000" />
              <Text className="text-xl font-bold">5</Text>
              <Text>Drafts</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
