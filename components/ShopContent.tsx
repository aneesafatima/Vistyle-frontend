import { View, Text } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { ItemCard, StudioModal } from ".";
import { ScrollView } from "react-native-gesture-handler";
import { GlobalContext } from "@/context/GlobalProvider";
import { useProductListByTextQuery } from "@/query/features/hmApi";
import { skipToken } from "@reduxjs/toolkit/query";
import * as Location from "expo-location";
import { set } from "react-hook-form";

const ShopContent = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState<"top" | "middle" | "bottom">();
  const [selectedProduct, setSelectedProduct] = useState({
    price: 0,
    code: "",
    url: "",
  });
  const { makeSearch, setMakeSearch } = useContext(GlobalContext)!;

  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data, error, isSuccess } = useProductListByTextQuery(
    makeSearch && searchText.trim() && countryCode
      ? { searchText, countryCode }
      : skipToken
  );

  useEffect(() => {
    const getCountryCode = async () => {
      try {
        // Ask for location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        // Get user coordinates
        const loc = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = loc.coords;
        // Reverse geocode to get country info
        const geocode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (geocode.length > 0) {
          console.log("Setting Country Code:", geocode[0].isoCountryCode);
          setCountryCode(geocode[0].isoCountryCode || null); // "IN", "US", etc.
        }
      } catch (error) {
        console.log(error);
        setErrorMsg("Error fetching country code");
      } finally {
        setIsFetchingLocation(false);
      }
    };
    getCountryCode();
  }, []);

  useEffect(() => {
    if (isSuccess || data) {
      setMakeSearch(false);
    }
  }, [isSuccess,data]);

  useEffect(() => {
    if (makeSearch && !countryCode) setMakeSearch(false);
  }, [makeSearch]);

  return (
    <View className="" style={{ marginTop: 96 }}>
      {!data ? (
        <View className="w-screen">
          <Text className="text-lg text-gray-600 text-center ">
            {isFetchingLocation
              ? "Detecting location..."
              : errorMsg
              ? errorMsg
              : "Let’s see what we can find…"}
          </Text>
        </View>
      ) : error ? (
        <Text className="text-center text-red-500">
          Error loading products.
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
          {data?.results.map((product: any, i: number) =>
            product.images[0]?.baseUrl ? (
              <ItemCard
                key={product.code || i}
                imageUrl={product.galleryImages?.[0]?.baseUrl || ""}
                baseUrl={product.images[0].baseUrl}
                code={product.articles[0].code || ""}
                brand="H&M"
                title={product.name || ""}
                price={product.price?.formattedValue || ""}
                setShowModal={setShowModal}
                showModal={showModal}
                setSelectedProduct={setSelectedProduct}
                priceValue={product.price?.value || 0}
                countryCode={countryCode}
              />
            ) : null
          )}
        </ScrollView>
      )}
      <StudioModal
        showModal={showModal}
        setShowModal={setShowModal}
        setCategory={setCategory}
        category={category}
        setPosition={setPosition}
        position={position}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </View>
  );
};

export default ShopContent;
