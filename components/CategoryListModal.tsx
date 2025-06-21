import { View, Text, Pressable, FlatList } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Modal from "react-native-modal";
import { LinearGradient } from "react-native-linear-gradient";
import { GlobalContext } from "@/context/GlobalProvider";

type CategoryListModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryListModal = ({
  showModal,
  setShowModal,
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

  return (
    <View>
      <Modal
        isVisible={showModal}
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
          className="h-[300px] w-64 rounded-[30px] p-[5px] relative"
        >
          <View className="h-48 w-full rounded-[30px] bg-[#f9f9f9] shadow-lg px-4 py-3">
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  className="w-full py-2 px-3 mb-1 rounded-xl bg-[#f9f9f9]"
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <Text className="text-[#b97031] text-sm font-interTight-medium">
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
          <Text className="text-sm font-interTight-medium text-center absolute flex-1 py-2 text-[#b97031] bottom-0 left-1/2 -translate-x-1/2">
            choose maximum 3 categories {"\n"} for mixing and matching
          </Text>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default CategoryListModal;
