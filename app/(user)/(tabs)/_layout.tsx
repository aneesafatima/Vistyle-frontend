import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
export default function Layout() {
  const pathname = usePathname();
  return (
    <>
    <Tabs>
      <TabSlot />
      <TabList
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#222831",
          height: 75,
          margin: 10,
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
        <TabTrigger name="home" href="/home">
          <Ionicons
            name="home-outline"
            size={25}
            color={pathname == "/home" ? "#9eadff" : "black"}
          />
        </TabTrigger>
        <TabTrigger name="cart" href="/cart">
          <Ionicons
            name="cart-outline"
            size={25}
            color={pathname == "/cart" ? "#9eadff" : "black"}
          />
        </TabTrigger>
        <TabTrigger name="design-studio" href="/design-studio">
          <Ionicons
            name="layers-outline"
            size={25}
            color={pathname == "/design-studio" ? "#9eadff" : "black"}
          />
        </TabTrigger>
        <TabTrigger name="profile" href="/profile">
          <Ionicons
            name="person-outline"
            size={25}
            color={pathname == "/profile" ? "#9eadff" : "black"}
          />
        </TabTrigger>
      </TabList>
    </Tabs>
      
    </>
  );
}

