import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpVerification() {
  const [otpCombo, setOtpCombo] = useState<(number | null)[]>(
    new Array(6).fill(null)
  );
  const [timer, setTimer] = useState(300);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          return 0;
        } else return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <SafeAreaView>
      <View className="items-center flex-col ">
        <View className="flex-row justify-center mt-32">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <TextInput
              className=" border-[1px] h-16 w-16 text-center text-3xl leading-16 rounded-md mx-1"
              keyboardType="numeric"
              key={index}
              maxLength={1}
              onChange={(value) => {
                const otp = [...otpCombo];
                otp[index] = parseInt(value.nativeEvent.text);
                setOtpCombo(otp);
              }}
            />
          ))}
        </View>
        <TouchableOpacity className="w-28 my-6 ">
          <Text className="bg-black py-3 text-center rounded-md text-white">
            Submit
          </Text>
        </TouchableOpacity>
        <Text className="text-gray-500 text-sm">
          Resend OTP{" "}
          {timer !== 0
            ? `in ${Math.floor(timer / 60) ? Math.floor(timer / 60) : "00"}:${
                timer % 60
                  ? timer % 60 < 10
                    ? `0${timer % 60}`
                    : timer % 60
                  : "00"
              }`
            : ""}
        </Text>
      </View>
    </SafeAreaView>
  );
}
