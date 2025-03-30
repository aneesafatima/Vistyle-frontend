
import {Tabs} from "expo-router";

const _layout = () => {
 //make request to the server 
  //protect this route and all under it 
  return (
    <>
        <Tabs screenOptions={{ headerShown: false }}>
              <Tabs.Screen name="home" options={{ title: "Home" }} />
              <Tabs.Screen name="design-studio" options={{ title: "Design Studio" }} />
              <Tabs.Screen name="profile" options={{ title: "Profile" }} />
              <Tabs.Screen name="shop" options={{ title: "Shop" }} />
            </Tabs>
    </>
  );
};

export default _layout;