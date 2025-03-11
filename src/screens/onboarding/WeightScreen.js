import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Header from "../../components/Header";

const WeightScreen = ({ navigation }) => {
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    // Validate weight
    if (!weight) {
      setError("Please enter your weight");
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
      setError("Please enter a valid weight between 30 and 300 kg");
      return;
    }

    // Clear error and navigate to next screen
    setError("");
    navigation.navigate("Height");
  };

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="About You" />

      <View style={tw`flex-1 justify-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-2`}>
          Enter Your Weight
        </Text>

        <Text style={tw`text-neutral-600 mb-6`}>
          We'll use this to track your progress
        </Text>

        <View style={tw`flex-row items-center`}>
          <TextInput
            value={weight}
            onChangeText={(text) => {
              // Allow only numbers and a single decimal point
              const filtered = text.replace(/[^0-9.]/g, "");
              // Ensure only one decimal point
              const parts = filtered.split(".");
              const formatted =
                parts.length > 1
                  ? `${parts[0]}.${parts.slice(1).join("")}`
                  : filtered;

              setWeight(formatted);
              setError("");
            }}
            placeholder="Your weight"
            keyboardType="numeric"
            error={error}
            style={tw`flex-1`}
          />

          <Text style={tw`ml-3 text-lg font-medium text-neutral-600`}>kg</Text>
        </View>

        <Button title="Next" onPress={handleNext} style={tw`mt-6`} />
      </View>
    </Container>
  );
};

export default WeightScreen;
