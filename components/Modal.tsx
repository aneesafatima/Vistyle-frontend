import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import { GlobalContext } from "@/context/GlobalProvider";
import {
  FashionInterest,
  fashionInterestColors,
} from "@/assets/ui-data/data";

const InterestsModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // UPDATE THE TAGS IN BACKEND AND UI
  const { userData, setUserData } = useContext(GlobalContext)!;
  const handleTagPress = (tag: string) => {
    setUserData((prev) => {
      if (prev) {
        const interests = prev.interests.includes(tag)
          ? prev.interests.filter((item) => item !== tag)
          : [...prev.interests, tag];
        return { ...prev, interests };
      } else return prev;
    });
  };

  return (
    <View className="flex-1">
    <Modal
      isVisible={showModal}
      coverScreen
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.7}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <View className="bg-white rounded-3xl p-4 pb-6  w-full">
        {userData?.interests && userData.interests.length >= 3 && (
          <Pressable
            className="absolute top-4 right-4"
            onPress={() => setShowModal(false)}
          >
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
        )}
        <Text className="mt-6 px-7 py-3 font-poppins-medium font-bold text-2xl text-center text-gray-800">
          Choose Styles which scream you!
        </Text>
        <Text className="text-center text-gray-500 mb-2">
          You must select at least 3 styles to proceed.
        </Text>

        <View className="flex flex-row flex-wrap justify-center mt-4">
          {FashionInterest.map((interest) => (
            <Pressable
              onPress={() => handleTagPress(interest)}
              key={interest}
              className="bg-gray-200 rounded-full px-4 py-2 mr-2 mb-2"
              style={{
                backgroundColor: fashionInterestColors[interest].bg,
                ...(userData?.interests?.includes(interest) && {
                  borderColor: "black",
                  borderWidth: 1,
                  borderStyle: "solid",
                  margin: -1,
                }),
              }}
            >
              <Text style={{ color: fashionInterestColors[interest].text }}>
                {interest}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
    </View>
  );
};

export default InterestsModal;
