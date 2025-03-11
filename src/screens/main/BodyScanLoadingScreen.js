import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";

const BodyScanLoadingScreen = ({ navigation, route }) => {
  const { photoUri } = route.params;

  useEffect(() => {
    // Simulate API call to analyze body composition
    const analyzeBodyComposition = setTimeout(() => {
      // In a real app, this would be an actual API call to analyze the photo
      // For now, we'll just simulate a response with a random body fat percentage
      const bodyFatPercentage = Math.floor(Math.random() * 10) + 15; // Random between 15-25%

      navigation.navigate("BodyScanResults", {
        bodyFatPercentage,
        photoUri,
      });
    }, 3000); // 3 second delay to simulate processing

    return () => clearTimeout(analyzeBodyComposition);
  }, [navigation, photoUri]);

  return (
    <Container>
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <ActivityIndicator
          size="large"
          color={tw.color("primary")}
          style={tw`mb-6`}
        />
        <Text style={tw`text-xl font-bold text-center mb-2`}>
          Analyzing Your Photo
        </Text>
        <Text style={tw`text-neutral-600 text-center`}>
          Our AI is estimating your body fat percentage. This will only take a
          moment...
        </Text>
      </View>
    </Container>
  );
};

export default BodyScanLoadingScreen;
