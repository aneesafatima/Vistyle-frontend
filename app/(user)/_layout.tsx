import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen
          name="design-studio"
          options={{ title: "Design Studio", tabBarStyle: { display: "none" } }}
        />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="cart" options={{ title: "Cart" }} />
        <Tabs.Screen
          name="design-canvas"
          options={{
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }}
        />

      </Tabs>
    </>
  );
};

export default _layout;
