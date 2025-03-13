import { View, Text, Alert, Pressable, TextInput } from "react-native";
import React,{useContext} from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/query/features/authApi";
import { GlobalContext } from "@/context/GlobalProvider";

interface UserEmailProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const UserEmail = ({ setStep }: UserEmailProps) => {
  const { setEmail } = useContext(GlobalContext)!;
  const [forgotPassword, {isSuccess}] = useForgotPasswordMutation();
  const logInSchema = z.object({
    email: z.string().email("Invalid email address"),
  });
  type LoginFormValues = z.infer<typeof logInSchema>;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await forgotPassword(data).unwrap();
      Alert.alert(
        "Email sent",
        "Please check your email to reset your password"
      );
      setStep(2);
    } catch (error: any) {
      console.log(error)
      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <View>
      <Text className="text-2xl font-bold text-center mb-4">
        Reset your password
      </Text>

      {/* Email Field */}
      <View className="mb-4">
        <Text className="text-lg text-gray-800">Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-4 mt-2 bg-white"
              placeholder="Enter your email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={(text) => {onChange(text); setEmail(text);}}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="mt-1">{errors.email.message}</Text>}
      </View>

      <Pressable
        className="bg-black py-3 rounded-lg"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center text-lg font-medium">
          Reset Password
        </Text>
      </Pressable>
    </View>
  );
};

export default UserEmail;
