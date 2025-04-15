import { View, Text, FlatList } from "react-native";
import HMdata from "../demo-data/H&M.json";
import ClothingItemCard from "./ClothingItemCard";
import { version } from "react";
const ProductsList = () => {
  const filteredData = HMdata.results.map((item,i) => {
   return {
    id: i.toString(),
     name: item.name,
     price: item.price.formattedValue,
     image: item.images[0].baseUrl
    }
  })
 
 
  const data = [
    {
      name: "Denim Jacket",
      price: "59.99",
      image: "https://example.com/jacket.jpg",
    },
  ];


  return (
    <FlatList
    className="flex z-0 w-full"
    contentContainerStyle={{alignItems: "center"}}
      keyExtractor={(item) => item.id}
      data={filteredData}
      renderItem={({ item }) => <ClothingItemCard item={item} />}
    />
  );
};

export default ProductsList;
