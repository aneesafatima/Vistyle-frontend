import { View, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ItemCard, StudioModal } from ".";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalContext } from "@/context/GlobalProvider";
import { useProductListByTextQuery } from "@/query/features/productApi";

const ShopContent = ({ searchText }: { searchText: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState<"top" | "middle" | "bottom">();
  const { makeSearch, setMakeSearch } = useContext(GlobalContext)!;
  const { data, isLoading, error } = useProductListByTextQuery(searchText, {
    skip: !makeSearch,
  });

  useEffect(() => {
    if (data && makeSearch) {
      // Reset after successful fetch
      setMakeSearch(false);
    }
  }, [data]);

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
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            rowGap: 16,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          showsVerticalScrollIndicator={false}
        >
          {data?.results.map((product: any, i: number) => (
            <ItemCard
              key={product.code || i}
              imageUrl={product.articles[0].normalPicture?.[0]?.url || ""}
              brand="H&M"
              title={product.name || ""}
              price={product.price?.formattedValue || ""}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          ))}
        </ScrollView>
      )}
      <StudioModal
        showModal={showModal}
        setShowModal={setShowModal}
        setCategory={setCategory}
        category={category}
        setPosition={setPosition}
        position={position}
      />
    </View>
  );
};

export default ShopContent;
