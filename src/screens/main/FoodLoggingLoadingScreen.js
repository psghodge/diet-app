import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import tw from "../../utils/tw";
import Container from "../../components/Container";

const FoodLoggingLoadingScreen = ({ route, navigation }) => {
  const { photoUri } = route.params || {};

  useEffect(() => {
    // Simulate API call to analyze food
    const timer = setTimeout(() => {
      // Mock food analysis result
      const mockResult = {
        foodItems: [
          {
            name: "Grilled Chicken Breast",
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6,
          },
          {
            name: "Brown Rice",
            calories: 216,
            protein: 5,
            carbs: 45,
            fat: 1.8,
          },
          {
            name: "Steamed Broccoli",
            calories: 55,
            protein: 3.7,
            carbs: 11.2,
            fat: 0.6,
          },
        ],
        totalCalories: 436,
        totalProtein: 39.7,
        totalCarbs: 56.2,
        totalFat: 6,
      };

      navigation.replace("FoodLoggingResults", {
        photoUri,
        analysisResult: mockResult,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, photoUri]);

  return (
    <Container>
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={styles.foodImage}
            resizeMode="cover"
          />
        )}

        <ActivityIndicator size="large" color="#3B82F6" style={tw`my-6`} />

        <Text style={tw`text-xl font-bold text-center mb-2`}>
          Analyzing Your Food
        </Text>

        <Text style={tw`text-gray-500 text-center`}>
          Our AI is identifying the food items and calculating nutritional
          information...
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  foodImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
});

export default FoodLoggingLoadingScreen;
