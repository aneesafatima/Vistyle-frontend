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
        className="justify-center items-center "
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
    <View className="bg-white flex-1">
      {showModal && (
        <CategoryListModal
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selelctedCategories}
        />
      )}
      <StatusBar
        backgroundColor={"white"}
        barStyle="dark-content"
        animated={true}
      />
      {showAlert && (
        <Alert
          text="No Stickers Found"
          description="You haven't created any stickers yet. Please create some stickers to use in the design studio."
          onAcceptText="Dismiss"
          onAccept={() => {
            router.push("/(user)/home");
            setShowAlert(false);
          }}
        />
      )}

      <View className="w-full flex-row justify-between items-center px-7 pt-10 pb-3 ">
        <TouchableOpacity>
          <Iconify
            icon="icon-park-outline:back"
            size={32}
            color="#9eadffd9"
            className="text-2xl"
          />
        </TouchableOpacity>
        <Text className="text-3xl text-[#9eadffd9] font-arial-rounded font-bold">
          Design Studio
        </Text>
        <TouchableOpacity onPress={() => router.push("/(user)/design-canvas")}>
          <Iconify
            icon="fluent:design-ideas-20-regular"
            size={37}
            color="#9eadffd9"
            className="text-2xl"
          />
        </TouchableOpacity>
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
            className="flex-1 justify-start "
            style={{
              justifyContent:
                selelctedCategories.length < 3 ? "center" : "space-between",
            }}
          >
            {topStickers.length > 0 && (
              <View className="">
                <Carousel
                  ref={carouselRef}
                  data={topStickers}
                  renderItem={renderTopItem}
                  width={screenWidth}
                  height={250}
                  style={{
                    width: screenWidth,
                  }}
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
              </View>
            )}

            {middleStickers.length > 0 && (
              <View className="">
                <Carousel
                  ref={carouselRef}
                  data={middleStickers}
                  renderItem={renderTopItem}
                  width={screenWidth}
                  height={300}
                  style={{
                    width: screenWidth,
                  }}
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
              </View>
            )}

            {bottomStickers.length > 0 && (
              <View>
                <Carousel
                  ref={carouselRef}
                  data={bottomStickers}
                  renderItem={renderTopItem}
                  width={screenWidth}
                  height={130}
                  style={{
                    width: screenWidth,
                  }}
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
              </View>
            )}
          </View>
        )}
      </View>

      {/* Footer Buttons */}
      <View className="flex-row justify-between w-full px-6 absolute bottom-5">
        <TouchableOpacity
          className="bg-[#fde0ca] p-3 rounded-full"
          onPress={() => setShowModal(true)}
        >
          <Iconify
            icon="iconamoon:swap-light"
            size={30}
            color="#F06038"
            className="text-2xl"
          />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#fde0ca] p-3 rounded-full">
          <Iconify
            icon="material-symbols:question-mark-rounded"
            size={30}
            color="#F06038"
            className="text-2xl"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DesignStudio;
