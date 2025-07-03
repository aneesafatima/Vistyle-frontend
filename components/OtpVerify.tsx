import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
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
  const [otpVerify, { isLoading }] = useOtpVerifyMutation();
  const inputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
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
    <View
      className="flex-1 justify-center items-center mt-10"
      style={{
        width: "100%",
        alignSelf: "center",
      }}
    >
      {/* OTP Input Container */}
      <View
        className="flex-row justify-between items-center mb-6"
        style={{
          width: "100%",
          alignSelf: "center",
          paddingHorizontal: 20,
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextInput
            ref={inputRefs[index]}
            key={index}
            className="border-[1px] border-gray-300 text-center text-2xl rounded-lg bg-transparent"
            style={{
              height: 55,
              width: 55,
              textAlign: "center",
              fontSize: 20,
              borderRadius: 8,
            }}
            keyboardType="numeric"
            maxLength={1}
            value={otpCombo[index]?.toString() || ""}
            onChangeText={(text) => {
              const otp = [...otpCombo];
              otp[index] = text ? parseInt(text) : null;
              setOtpCombo(otp);
              if (text && index < 5) {
                inputRefs[index + 1].current?.focus();
              } 
            }}
          />
        ))}
      </View>
      <Text className="text-gray-500 text-sm font-arial-rounded mb-4">
        Enter the 6-digit OTP sent to your email
      </Text>

      {/* Submit Button */}
      <Pressable
        className="py-4 px-12 rounded-lg flex-row justify-center items-center bg-[#9eadffd9] mb-4"
        style={{
          width: "100%",
          maxWidth: 300,
          alignSelf: "center",
        }}
        onPress={checkOtp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-lg font-medium text-center font-arial-rounded">
            Verify OTP
          </Text>
        )}
      </Pressable>

      {/* Timer Text */}
      <Text
        className="text-gray-500 text-sm font-arial-rounded text-center underline"
        style={{ alignSelf: "center" }}
      >
        {timer !== 0 ? (
          <>
            Resend OTP in{" "}
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
            :{(timer % 60).toString().padStart(2, "0")}
          </>
        ) : (
          <TouchableOpacity>
            <Text className="text-[#9eadffd9] text-sm font-medium underline">
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
}
