import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // Here we would normally authenticate with Supabase
    // For now, we'll just simulate a login
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to onboarding or main app
      navigation.navigate("Onboarding");
    }, 1000);
  };

  const handleSignUp = () => {
    // For now, we'll just navigate to onboarding
    navigation.navigate("Onboarding");
  };

  return (
    <Container
      scrollable={false}
      contentContainerStyle={tw`justify-center px-6`}
      statusBarColor="dark"
    >
      <View style={tw`items-center mb-8`}>
        <Image
          source={require("../../../assets/icon.png")}
          style={[tw`w-24 h-24 mb-4`, styles.logo]}
          resizeMode="contain"
        />
        <Text style={tw`text-2xl font-bold text-primary text-center`}>
          Welcome to Your Weight Loss Journey
        </Text>
      </View>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button
        title="Login"
        onPress={handleLogin}
        loading={isLoading}
        style={tw`mt-4`}
      />

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        variant="outline"
        style={tw`mt-3`}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default LoginScreen;
