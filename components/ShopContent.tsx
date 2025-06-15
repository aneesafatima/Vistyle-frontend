import { View, Text, Pressable } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ItemCard } from ".";
import Modal from "react-native-modal";
import { LinearGradient } from "react-native-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import Iconify from "react-native-iconify";
import { GlobalContext } from "@/context/GlobalProvider";
import { useProductListByTextQuery } from "@/query/features/productApi";

const ShopContent = ({ searchText }: { searchText: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState<
    "top" | "middle" | "bottom" | null
  >();
  const { makeSearch } = useContext(GlobalContext)!;
  const { data, isLoading, error } = useProductListByTextQuery(searchText, {
    skip: !makeSearch,
  });

  return (
    <View
      className="flex-1 "
      style={
        searchText == ""
          ? { justifyContent: "center", alignItems: "center" }
          : { marginTop: 96 }
      }
    >
      {searchText == "" && !makeSearch ? (
        <View>
          <Text className="text-xl font-semibold">Shop Content</Text>
          <Text className="text-gray-500">Coming soon...</Text>
        </View>
      ) : isLoading ? (
        <Text className="text-center text-gray-500">Loading...</Text>
      ) : error ? (
        <Text className="text-center text-red-500">
          Error loading products. {error.message}
        </Text>
      ) : (
        <View className="flex-row flex-wrap px-4 gap-4">
          {data?.results.map((product: any, i: number) => (
            <ItemCard
              key={product.code || i}
              imageUrl={product.normalPicture?.[0]?.url || ""}
              brand="H&M"
              title={product.name || ""}
              price={product.price?.formattedValue || ""}
              setShowModal={setShowModal}
            />
          ))}
        </View>
      )}

      {/* ...your Modal code remains unchanged... */}
    </View>
  );
};

export default ShopContent;
