import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Header from "../../components/Header";

const HeightScreen = ({ navigation }) => {
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    // Validate height
    if (!height) {
      setError("Please enter your height");
      return;
    }

    const heightNum = parseInt(height, 10);
    if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
      setError("Please enter a valid height between 100 and 250 cm");
      return;
    }

    // Clear error and navigate to next screen
    setError("");
    navigation.navigate("Photo");
  };

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="About You" />

      <View style={tw`flex-1 justify-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-2`}>
          Enter Your Height
        </Text>

        <Text style={tw`text-neutral-600 mb-6`}>
          This helps us calculate your BMI and other metrics
        </Text>

        <View style={tw`flex-row items-center`}>
          <TextInput
            value={height}
            onChangeText={(text) => {
              setHeight(text.replace(/[^0-9]/g, ""));
              setError("");
            }}
            placeholder="Your height"
            keyboardType="number-pad"
            error={error}
            style={tw`flex-1`}
          />

          <Text style={tw`ml-3 text-lg font-medium text-neutral-600`}>cm</Text>
        </View>

        <Button title="Next" onPress={handleNext} style={tw`mt-6`} />
      </View>
    </Container>
  );
};

export default HeightScreen;
