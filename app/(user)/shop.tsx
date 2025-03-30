import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
const Shop = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "H&M", value: "h&m" },
    { label: "Amazon", value: "amazon" },
    { label: "Flipkart", value: "flipkart" },
  ]);
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl text-center mt-5 font-bold">Shop</Text>
      </View>

      <View className="flex-row m-3 justify-center">
        <TextInput
          className=" p-3 w-[70%] border rounded-sm border-gray-300"
          placeholder="search"
          placeholderTextColor={"#CDCDE0"}
        />
        <Pressable className=" p-3 bg-blue-400">
          <Text>OK</Text>
        </Pressable>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a store"
        style={{
          borderWidth: 1,
          borderColor: "#000",
          width: "10%",
          alignSelf: "center",
        }}
        placeholderStyle={{ color: "#000" }}
        labelStyle={{ color: "#CDCDE0" }}
        dropDownContainerStyle={{
          borderWidth: 1,
          borderColor: "#000",
          width: "10%",
          alignSelf: "center",
        }}
      />
      </View>
     
    </SafeAreaView>
  );
};

export default Shop;
