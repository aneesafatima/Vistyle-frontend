import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useOtpVerifyMutation } from "@/query/features/authApi";
import { GlobalContext } from "@/context/GlobalProvider";

interface UserEmailProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
export default function OtpVerify({ setStep }: UserEmailProps) {
  const { email } = useContext(GlobalContext)!;
  const [otpCombo, setOtpCombo] = useState<(number | null)[]>(
    new Array(6).fill(null)
  );
  const [timer, setTimer] = useState(300);
  const [otpVerify] = useOtpVerifyMutation();
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
  const checkOtp = async () => {
    try {
      const otp = otpCombo.join("");
      await otpVerify({ otp, email }).unwrap();
      setStep(3);
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <View className="items-center flex-col ">
      <View className="flex-row justify-center mt-32">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <TextInput
            className="border-[1px] h-16 w-16 text-center text-3xl leading-16 rounded-md mx-1"
            style={{
              borderWidth: 1,
              height: 64,
              width: 64,
              textAlign: "center",
              fontSize: 24,
              borderRadius: 8,
              marginHorizontal: 4,
            }}
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
      <TouchableOpacity className="w-28 my-6" onPress={() => checkOtp()}>
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
  );
}
