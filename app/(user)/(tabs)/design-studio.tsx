import React, { useCallback, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
import { Iconify } from "react-native-iconify";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Animated from "react-native-reanimated";
import Alert from "@/components/Alert";
import { CategoryListModal } from "@/components";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DesignStudio = () => {
  const { userData } = useContext(GlobalContext)!;
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const [showModal, setShowModal] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);

  // Animation values for menu
  const menuOpacity = useSharedValue(0);
  const menuTranslateX = useSharedValue(100);
  const menuScale = useSharedValue(0.8);

  // Filter stickers for top category and position
  const [selelctedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  useFocusEffect(
    useCallback(() => {
      if (userData?.stickers?.length === 0) {
        setShowAlert(true);
      }
    }, [userData?.stickers])
  );

  const toggleMenu = () => {
    if (menuVisible) {
      // Hide menu
      menuOpacity.value = withTiming(0, { duration: 200 });
      menuTranslateX.value = withTiming(100, { duration: 200 });
      menuScale.value = withTiming(0.8, { duration: 200 });
    } else {
      // Show menu
      menuOpacity.value = withTiming(1, { duration: 300 });
      menuTranslateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      menuScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    }
    setMenuVisible(!menuVisible);
  };

  // Animated style for menu buttons
  const animatedMenuStyle = useAnimatedStyle(() => {
    return {
      opacity: menuOpacity.value,
      transform: [
        { translateX: menuTranslateX.value },
        { scale: menuScale.value },
      ],
    };
  });

  const topStickers =
    userData?.stickers?.filter(
      (sticker) =>
        sticker.position === "top" &&
        selelctedCategories.includes(sticker.category)
    ) || [];
  const middleStickers =
    userData?.stickers?.filter(
      (sticker) =>
        sticker.position === "middle" &&
        selelctedCategories.includes(sticker.category)
    ) || [];
  const bottomStickers =
    userData?.stickers?.filter(
      (sticker) =>
        sticker.position === "bottom" &&
        selelctedCategories.includes(sticker.category)
    ) || [];

  // Render item for carousel with animation
  const renderTopItem = ({
    item,
    index,
    animationValue,
  }: {
    item: any;
    index: number;
    animationValue: any;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.7, 1, 0.7]
      );

      const rotateZ = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [-15, 0, 15]
      );

      const opacity = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.7, 1, 0.7]
      );

      return {
        transform: [{ scale }, { rotateZ: `${rotateZ}deg` }],
        opacity,
      };
    });

    return (
      <Animated.View
        style={[animatedStyle]}
        className="justify-center items-center flex-1"
      >
        <Image
          source={{ uri: item.url }}
          className=""
          style={{
            ...(item.position === "top"
              ? { width: 250, height: 250 }
              : item.position === "middle"
              ? { width: 350, height: 350 }
              : { width: 180, height: 180 }),
          }}
          resizeMode="contain"
        />
      </Animated.View>
    );
  };

  return (
    <View className="bg-[#FAFAFA] flex-1">
      {showModal && (
        <CategoryListModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selelctedCategories}
        />
      )}
      <StatusBar
        backgroundColor={"#FAFAFA"}
        barStyle="dark-content"
        animated={true}
      />
      {showAlert && (
        <Alert
          text="No Stickers Found"
          description="You haven't created any stickers yet. Please create some stickers to use in the design studio."
          onAcceptText="Dismiss"
          onAccept={() => {
            router.push("/(user)/(tabs)/home");
            setShowAlert(false);
          }}
        />
      )}

      <View className="w-full flex-row justify-between items-center px-7 pt-10 pb-3 ">
        <TouchableOpacity
          className="p-4 px-2 rounded-xl"
          style={{ backgroundColor: menuVisible ? "#cfcfcf" : "#eaeaea" }}
          onPress={toggleMenu}
        >
          <Iconify
            icon="material-symbols-light:more-vert"
            size={25}
            color="#6E6E6E"
          />
        </TouchableOpacity>

        <Animated.View
          style={[animatedMenuStyle]}
          className="flex-row items-center gap-2"
        >
          <TouchableOpacity
            className="bg-[#eaeaea] p-4 rounded-xl"
            onPress={() => {
              router.back();
              setMenuVisible(false);
              menuOpacity.value = 0;
              menuTranslateX.value = 100;
              menuScale.value = 0.8;
            }}
          >
            <Iconify
              icon="material-symbols-light:arrow-back-2-outline-rounded"
              size={28}
              color="#6E6E6E"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#eaeaea] p-3 rounded-xl"
            onPress={() => {
              router.push("/(user)/(tabs)/design-canvas");
              setMenuVisible(false);
              menuOpacity.value = 0;
              menuTranslateX.value = 100;
              menuScale.value = 0.8;
            }}
          >
            <Iconify
              icon="fluent:design-ideas-20-regular"
              size={32}
              color="#6E6E6E"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#eaeaea] p-3 rounded-xl"
            onPress={() => {
              setShowModal(true);
              setMenuVisible(false);
              menuOpacity.value = 0;
              menuTranslateX.value = 100;
              menuScale.value = 0.8;
            }}
          >
            <Iconify icon="iconamoon:swap-light" size={30} color="#6E6E6E" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#eaeaea] p-3 rounded-xl">
            <Iconify
              icon="material-symbols:question-mark-rounded"
              size={30}
              color="#6E6E6E"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View className="flex-1 pb-20">
        {selelctedCategories.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <View className="flex-row items-center">
              <Text className="text-base text-[#b5b5b5] text-center">
                Select categories to mix using the{" "}
              </Text>
              <Iconify
                icon="iconamoon:swap-light"
                size={20}
                color="#b5b5b5"
                className=""
              />
            </View>
          </View>
        ) : (
          <View
            className="flex-col flex-1"
            style={{
              justifyContent:
                selelctedCategories.length < 3 ? "center" : "space-between",
            }}
          >
            {topStickers.length > 0 && (
              <Carousel
                ref={carouselRef}
                data={topStickers}
                renderItem={renderTopItem}
                width={screenWidth}
                height={250}
                loop={true}
                autoPlay={false}
                snapEnabled={true}
                onProgressChange={progress}
                mode="horizontal-stack"
                modeConfig={{
                  snapDirection: "left",
                  stackInterval: 30,
                  scaleInterval: 0.08,
                  rotateZDeg: 15,
                  moveSize: screenWidth * 0.6,
                }}
                customConfig={() => ({ type: "positive", viewCount: 3 })}
                scrollAnimationDuration={300}
              />
            )}

            {middleStickers.length > 0 && (
              <Carousel
                ref={carouselRef}
                data={middleStickers}
                renderItem={renderTopItem}
                width={screenWidth}
                height={300}
                loop={true}
                autoPlay={false}
                snapEnabled={true}
                onProgressChange={progress}
                mode="horizontal-stack"
                modeConfig={{
                  snapDirection: "left",
                  stackInterval: 30,
                  scaleInterval: 0.08,
                  rotateZDeg: 15,
                  moveSize: screenWidth * 0.6,
                }}
                customConfig={() => ({ type: "positive", viewCount: 3 })}
                scrollAnimationDuration={300}
              />
            )}

            {bottomStickers.length > 0 && (
              <Carousel
                ref={carouselRef}
                data={bottomStickers}
                renderItem={renderTopItem}
                width={screenWidth}
                height={130}
                loop={true}
                autoPlay={false}
                snapEnabled={true}
                onProgressChange={progress}
                mode="horizontal-stack"
                modeConfig={{
                  snapDirection: "left",
                  stackInterval: 30,
                  scaleInterval: 0.08,
                  rotateZDeg: 15,
                  moveSize: screenWidth * 0.6,
                }}
                customConfig={() => ({ type: "positive", viewCount: 3 })}
                scrollAnimationDuration={300}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default DesignStudio;
