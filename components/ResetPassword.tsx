import { View, Text } from "react-native";
import React from "react";
interface ResetPasswordProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ResetPassword = ({ setStep }: ResetPasswordProps) => {
  return (
    <View>
      <Text className="text-3xl">ResetPassword</Text>
    </View>
  );
};

export default ResetPassword;
