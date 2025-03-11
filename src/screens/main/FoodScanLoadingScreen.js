import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";

const FoodScanLoadingScreen = ({ navigation, route }) => {
  const { photoUri } = route.params;

  useEffect(() => {
    // Simulate API call to analyze food
    const analyzeFoodContent = setTimeout(() => {
      // In a real app, this would be an actual API call to analyze the photo
      // For now, we'll just simulate a response with mock food data
      const foodData = {
        name: "Grilled Chicken Salad",
        calories: 320,
        carbs: 12,
        fat: 15,
        protein: 35,
        photoUri,
      };

      navigation.navigate("FoodScanResults", foodData);
    }, 3000); // 3 second delay to simulate processing

    return () => clearTimeout(analyzeFoodContent);
  }, [navigation, photoUri]);

  return (
    <Container>
      <View style={tw`flex-1 items-center justify-center p-6`}>
        <ActivityIndicator
          size="large"
          color={tw.color("secondary")}
          style={tw`mb-6`}
        />
        <Text style={tw`text-xl font-bold text-center mb-2`}>
          Analyzing Your Food
        </Text>
        <Text style={tw`text-neutral-600 text-center`}>
          Our AI is identifying the food and calculating its nutritional
          content. This will only take a moment...
        </Text>
      </View>
    </Container>
  );
};

export default FoodScanLoadingScreen;
