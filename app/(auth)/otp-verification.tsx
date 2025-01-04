import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpVerification() {
  const [otpCombo, setOtpCombo] = useState<(number | null)[]>(
    new Array(6).fill(null)
  );

  // const otpResendTimer = () => {
  //   let c=0;
  //   for(let i=300;i>=0;i--){
  //       c++;
  //       setTimeout(()=>{
  //           const minutes = Math.floor(i / 60);
  //           const remainingSeconds = i % 60;
  //           return `${minutes}:${remainingSeconds}`;
  //       },c*1000)
  //   }
  // }
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
        <Text className="text-gray-500 text-sm">Resend OTP in  </Text>
      </View>
    </SafeAreaView>
  );
}