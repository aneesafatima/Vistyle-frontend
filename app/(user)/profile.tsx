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
import { useContext, useState } from "react";
import { fashionInterestColors } from "../../assets/ui-data/colors";
import { InterestsModal } from "@/components";
import { GlobalContext } from "@/context/GlobalProvider";
import { UserSettings } from "@/components";
import { set } from "react-hook-form";

///////////////////////////////////////////////////////////////////////////////////

const Profile = () => {
  const [fontsLoaded] = useFonts({
    "poppins-medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const width = useSharedValue(64);
  const height = useSharedValue(64);
  const borderRadius = useSharedValue(32);
  const marginTop = useSharedValue(40);
  const marginLeft = useSharedValue(20);
  const marginRight = useSharedValue(20);
  const animatedStyles = useAnimatedStyle(() => ({
    width: width.value,
    height: height.value,
    borderRadius: borderRadius.value,
    backgroundColor: "#F5F4F0",
    marginTop: marginTop.value,
    marginLeft: marginLeft.value,
    marginRight: marginRight.value,
  }));
  const toggleAnimation = () => {
    console.log("toggleAnimation");
    const newEditingProfile = !isEditingProfile;
    setIsEditingProfile(newEditingProfile);
    width.value = withTiming(newEditingProfile ? screenWidth : 64, {
      duration: 300,
      easing: Easing.linear,
    });
    height.value = withTiming(newEditingProfile ? screenHeight : 64, {
      duration: 300,
      easing: Easing.linear,
    });
    borderRadius.value = withTiming(newEditingProfile ? 0 : 32, {
      duration: 300,
      easing: Easing.linear,
    });
    marginTop.value = withTiming(newEditingProfile ? 0 : 40, {
      duration: 300,
      easing: Easing.linear,
    });
    marginLeft.value = withTiming(newEditingProfile ? 0 : 20, {
      duration: 300,
      easing: Easing.linear,
    });
    marginRight.value = withTiming(newEditingProfile ? 0 : 20, {
      duration: 300,
      easing: Easing.linear,
    });
  };
  const [showCollections, setShowCollections] = useState(false);
  const [showAllCreations, setshowAllCreations] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { userData } = useContext(GlobalContext)!;
  if (!fontsLoaded) return;
  let defaultCollections = ["C-1", "C-2", "C-3", "C-4"];
  let defaultCreations = ["A-1"];
  return (
    <SafeAreaView className="bg-white h-fit">
      <InterestsModal showModal={showModal} setShowModal={setShowModal} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        scrollEnabled={!isEditingProfile}
      >
        <View
          className={`bg-[#F5F4F0] ${
            !isEditingProfile && "flex flex-row justify-between items-center"
          }`}
        >
          <TouchableOpacity
            className={` bg-[#ececec] rounded-full w-16 h-16 mt-10 mx-5  ${
              isEditingProfile ? "hidden" : "flex items-center justify-center"
            }`}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text
            className={`text-3xl text-center mt-10 font-bold ${
              isEditingProfile ? "hidden " : "flex items-center justify-center"
            }`}
          >
            Profile
          </Text>
          <View
            className="w-fit relative"
            style={{
              ...(isEditingProfile && {
                zIndex: 10,
              }),
            }}
          >
            <View >
              {isEditingProfile ? (
                <>
                  <Pressable
                    className="absolute top-7 left-6"
                    onPress={() => setIsEditingProfile(true)}
                  >
                    <MaterialIcons
                      name="arrow-back-ios-new"
                      size={24}
                      color="red"
                    />
                  </Pressable>
                  <Pressable
                    className="absolute top-7 right-6"
                    onPress={() => setIsEditingProfile(false)}
                  >
                    <Feather name="check" size={26} color="green" />
                  </Pressable>
                </>
              ) : (
                <Pressable className="justify-center items-center flex h-full">
                  {" "}
                  <FontAwesome
                    name="pencil"
                    size={24}
                    color="black"
                    onPress={() => setIsEditingProfile(true)}
                  />
                </Pressable>
              )}
              {isEditingProfile && <UserSettings />}
            </View>
          </View>
        </View>
        <View className="flex flex-row relative justify-center  mt-5 ">
          <Image className="w-52 top-1/2 -translate-y-1/2 absolute -left-[70px] bg-yellow-100 h-52  rounded-2xl my-2 rotate-[20deg]"></Image>
          <Image className="w-64 bg-pink-100 h-64 rounded-3xl my-2 self-center"></Image>
          <Image className="w-52 top-1/2 -translate-y-1/2  absolute -right-[70px] bg-blue-100 h-52 rounded-2xl my-2 -rotate-[20deg]"></Image>
        </View>

        <View>
          <Text className="text-4xl font-bold text-center mt-8 font-poppins-medium">
            John Doe
          </Text>
          <Text className="text-center text-md text-gray-500">
            #TheMinimalist
          </Text>
        </View>
        <View className="mx-8">
          <View className="flex flex-row justify-between mt-5">
            <Text className="text-xl font-medium">Interests</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text className="text-gray-500 underline">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center flex-wrap mt-5">
            {userData?.interests?.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={` rounded-full px-4 py-2 mr-2 mb-2`}
                style={{ backgroundColor: fashionInterestColors[item].bg }}
              >
                <Text
                  className="text-base  text-medium text-center"
                  style={{ color: fashionInterestColors[item].text }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex flex-row justify-center gap-32  mt-12">
          <Pressable
            onPress={() => {
              setShowCollections(false);
              setshowAllCreations(true);
            }}
          >
            <Feather
              name="layout"
              size={24}
              color={showAllCreations ? "black" : "gray"}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setshowAllCreations(false);
              setShowCollections(true);
            }}
          >
            <MaterialIcons
              name="collections-bookmark"
              size={24}
              color={showCollections ? "black" : "gray"}
            />
          </Pressable>
        </View>
        <View className={`justify-center mt-8 flex flex-row flex-wrap gap-2`}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
