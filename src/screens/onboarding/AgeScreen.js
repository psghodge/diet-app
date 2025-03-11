import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Header from "../../components/Header";

const AgeScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    // Validate age
    if (!age) {
      setError("Please enter your age");
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
      setError("Please enter a valid age between 13 and 120");
      return;
    }

    // Clear error and navigate to next screen
    setError("");
    navigation.navigate("Sex");
  };

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="About You" showBackButton={false} />

      <View style={tw`flex-1 justify-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-2`}>
          Enter Your Age
        </Text>

        <Text style={tw`text-neutral-600 mb-6`}>
          We'll use this to customize your experience
        </Text>

        <TextInput
          value={age}
          onChangeText={(text) => {
            setAge(text.replace(/[^0-9]/g, ""));
            setError("");
          }}
          placeholder="Your age"
          keyboardType="number-pad"
          error={error}
        />

        <Button title="Next" onPress={handleNext} style={tw`mt-6`} />
      </View>
    </Container>
  );
};

export default AgeScreen;
