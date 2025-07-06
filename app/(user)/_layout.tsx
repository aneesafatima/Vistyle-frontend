import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { usePathname } from "expo-router";

export default function Layout() {

function CustomTabIcon({ name, icon }: { name: string; icon: string }) {
  const pathname = usePathname();
  const isActive = pathname === `/${name}`;
  return (
    <TabTrigger name={name} href="/home">
      <View>
        <Ionicons name={icon} size={25} color={isActive ? "#00ADB5" : "gray"} />
      </View>
    </TabTrigger>
  );
}

  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#222831",
          height: 75,
          margin: 20,
          borderRadius: 40,
          paddingHorizontal: 10,
          alignItems: "center",
          elevation: 5,
          position: "absolute",
          bottom: 0,
          width: "80%",
          alignSelf: "center",
        }}
      >
          <CustomTabIcon name="home" icon="home-outline" />
        <CustomTabIcon name="cart" icon="cart-outline" />
        <CustomTabIcon name="design-studio" icon="layers-outline" />
        <CustomTabIcon name="profile" icon="person-outline" />

        {/* <TabTrigger name="home" href="/home" >
          <Ionicons name="home-outline" size={25} color="black" />
        </TabTrigger>
        <TabTrigger name="cart" href="/cart">
          <Ionicons name="cart-outline" size={25} color="black" />
        </TabTrigger>
        <TabTrigger name="design-studio" href="/design-studio">
          <Ionicons name="layers-outline" size={25} color="black" />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile">
          <Ionicons name="person-outline" size={25} color="black" />
        </TabTrigger> */}
      </TabList>
    </Tabs>
  );
}
