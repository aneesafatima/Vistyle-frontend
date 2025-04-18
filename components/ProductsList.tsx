import { FlatList } from "react-native";
import { Canvas, Image, useImage } from "@shopify/react-native-skia";
import HMdata from "../demo-data/H&M.json";
import ClothingItemCard from "./ClothingItemCard";
import { GlobalContext } from "@/context/GlobalProvider";
import { useContext, useEffect } from "react";
const ProductsList = () => {
  const filteredData = HMdata.results.map((item, i) => {
    return {
      id: i.toString(),
      name: item.name,
      price: item.price.formattedValue,
      image: item.images[0].baseUrl,
    };
  });


  return (
    <>
      <FlatList
        className="flex z-0 w-full"
        contentContainerStyle={{ alignItems: "center" }}
        keyExtractor={(item) => item.id}
        data={filteredData}
        renderItem={({ item }) => <ClothingItemCard item={item} />}
      />
    </>
  );
};

export default ProductsList;
