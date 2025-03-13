import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserEmail, OtpVerify,ResetPassword } from "../../components";

const resetPassword = () => {
  const [step, setStep] = useState(1);
  console.log(step);
  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      {step === 1 && <UserEmail setStep={setStep} />}
      {step === 2 && <OtpVerify setStep={setStep} />}
      {step === 3 && <ResetPassword setStep={setStep} />}
    </SafeAreaView>
  );
};

export default resetPassword;
