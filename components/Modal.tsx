import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import { GlobalContext } from "@/context/GlobalProvider";
import { FashionInterest, fashionInterestColors } from "@/assets/ui-data/data";

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
          <Text className="mt-6 px-7 py-3 font-arial-rounded  text-2xl text-center text-gray-800">
            Choose Styles which scream you!
          </Text>
          <Text className="text-center text-gray-500 my-2 font-arial-rounded">
            You must select at least 3 styles to proceed.
          </Text>

          <View className="flex flex-row flex-wrap justify-center mt-4">
            {FashionInterest.map((interest) => (
              <Pressable
                onPress={() => handleTagPress(interest)}
                key={interest}
                className="rounded-full px-4 py-2 mr-2 mb-2 bg-[#fbe1cd88]  "
                style={{
                  borderColor: userData?.interests?.includes(interest)
                    ? "#a3693c"
                    : "#ccc",
                  borderWidth: 1,
                }}
              >
                <Text className="text-[#a3693c] ">{interest}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InterestsModal;
