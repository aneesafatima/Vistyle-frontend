import { SafeAreaView } from "react-native";
import { ProductsList, SearchBar } from "@/components";

const Shop = () => {
  return (
    <SafeAreaView>
      <SearchBar />
      <ProductsList />
    </SafeAreaView>
  );
};

export default Shop;
