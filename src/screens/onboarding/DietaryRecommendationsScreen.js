import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Header from "../../components/Header";

const DietaryRecommendationsScreen = ({ navigation }) => {
  // In a real app, these would be calculated based on user data
  const recommendations = {
    calories: 1800,
    carbs: 200,
    fat: 60,
    protein: 120,
  };

  const handleFinish = () => {
    // Navigate to the main app
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  const MacroItem = ({ icon, title, value, unit, color, percentage }) => (
    <View style={tw`flex-row items-center mb-6`}>
      <View
        style={tw`w-12 h-12 rounded-full bg-${color} bg-opacity-10 items-center justify-center mr-4`}
      >
        <Ionicons name={icon} size={24} color={tw.color(color)} />
      </View>

      <View style={tw`flex-1`}>
        <Text style={tw`text-neutral-600 text-sm`}>{title}</Text>
        <View style={tw`flex-row items-baseline`}>
          <Text style={tw`text-xl font-bold text-neutral-800`}>{value}</Text>
          <Text style={tw`text-neutral-600 ml-1`}>{unit}</Text>
        </View>
      </View>

      {percentage && (
        <Text style={tw`text-neutral-500 text-sm`}>{percentage}%</Text>
      )}
    </View>
  );

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="Your Plan" />

      <View style={tw`flex-1 justify-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-2`}>
          Your Daily Targets
        </Text>

        <Text style={tw`text-neutral-600 mb-8`}>
          Based on your goals and body metrics, we recommend the following daily
          intake:
        </Text>

        <View style={tw`bg-neutral-50 rounded-xl p-6 mb-8`}>
          <View style={tw`items-center mb-6`}>
            <Text style={tw`text-neutral-600 text-sm mb-1`}>
              Daily Calories
            </Text>
            <Text style={tw`text-4xl font-bold text-primary`}>
              {recommendations.calories}
              <Text style={tw`text-xl font-normal text-neutral-500`}>
                {" "}
                kcal
              </Text>
            </Text>
          </View>

          <View style={tw`h-px bg-neutral-200 mb-6`} />

          <MacroItem
            icon="pizza"
            title="Carbohydrates"
            value={recommendations.carbs}
            unit="g"
            color="primary"
            percentage={Math.round(
              ((recommendations.carbs * 4) / recommendations.calories) * 100
            )}
          />

          <MacroItem
            icon="water"
            title="Fat"
            value={recommendations.fat}
            unit="g"
            color="accent"
            percentage={Math.round(
              ((recommendations.fat * 9) / recommendations.calories) * 100
            )}
          />

          <MacroItem
            icon="barbell"
            title="Protein"
            value={recommendations.protein}
            unit="g"
            color="secondary"
            percentage={Math.round(
              ((recommendations.protein * 4) / recommendations.calories) * 100
            )}
          />
        </View>

        <Button title="Start Your Journey" onPress={handleFinish} size="lg" />
      </View>
    </Container>
  );
};

export default DietaryRecommendationsScreen;
