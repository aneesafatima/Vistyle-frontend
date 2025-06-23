import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Modal from "react-native-modal";
import { LinearGradient } from "react-native-linear-gradient";
import { GlobalContext } from "@/context/GlobalProvider";
import Iconify from "react-native-iconify";

type CategoryListModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const CategoryListModal = ({
  showModal,
  setShowModal,
  selectedCategories,
  setSelectedCategories,
}: CategoryListModalProps) => {
  const { userData } = useContext(GlobalContext)!;

  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    let c: string[] = [];
    userData?.stickers.map((sticker) => {
      if (!c?.includes(sticker.category)) c.push(sticker.category);
    });
    setCategories(c);
  }, [userData]);
  const handleCategoryPress = (category: string) => {
    if (selectedCategories?.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View>
      <Modal
        isVisible={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor="black"
        backdropOpacity={0.2}
        coverScreen={true}
        animationInTiming={300}
        onBackButtonPress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
        useNativeDriver
        hideModalContentWhileAnimating={true}
        style={{ margin: 0, justifyContent: "center", alignItems: "center" }}
      >
        <LinearGradient
          colors={["#ffb677", "#ffe0c2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 250,
            height: 220,
            borderRadius: 30,
            padding: 5,
          }}
          className="h-[220px] w-64 rounded-[30px] p-[5px] relative"
        >
          <View className="flex-1 w-full rounded-[30px] bg-[#f9f9f9] shadow-lg px-4 py-3 mb-4">
            <Text className="text-sm font-interTight-medium text-center text-[#a6a6a6] mt-1 mb-4">
              Choose max 3 categories for mixing
            </Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 8 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="w-full py-2.5 px-3 mb-2 rounded-lg flex-row justify-between items-center"
                  style={{
                    backgroundColor: selectedCategories.includes(item)
                      ? "#e1e1e1"
                      : "#f5f5f5",
                    borderWidth: 1,
                    borderColor: "#e0e0e0",
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                  onPress={() => handleCategoryPress(item)}
                >
                  <Text className="text-[#6b7280] text-sm font-interTight-medium ">
                    {item}
                  </Text>
                  <Pressable>
                    <Iconify
                      icon="mdi-light:delete"
                      size={20}
                      color="#da5151"
                    />
                  </Pressable>
                </TouchableOpacity>
              )}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default CategoryListModal;
