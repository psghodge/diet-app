import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Header from "../../components/Header";

const BodyFatResultsScreen = ({ navigation }) => {
  // In a real app, this would come from the API after analyzing the photo
  const bodyFatPercentage = 22;

  const handleNext = () => {
    navigation.navigate("GoalSelection");
  };

  const getBodyFatCategory = (percentage) => {
    if (percentage < 10) return { label: "Essential Fat", color: "info" };
    if (percentage < 14) return { label: "Athletes", color: "success" };
    if (percentage < 21) return { label: "Fitness", color: "success" };
    if (percentage < 25) return { label: "Average", color: "warning" };
    return { label: "Obese", color: "error" };
  };

  const category = getBodyFatCategory(bodyFatPercentage);

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="Body Analysis" />

      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-6 text-center`}>
          Your Body Fat Percentage
        </Text>

        <View
          style={tw`items-center justify-center w-48 h-48 rounded-full bg-primary bg-opacity-10 mb-6`}
        >
          <Text style={tw`text-5xl font-bold text-primary`}>
            {bodyFatPercentage}%
          </Text>
          <Text style={tw`text-sm text-primary mt-1`}>{category.label}</Text>
        </View>

        <View style={tw`bg-neutral-100 rounded-lg p-4 mb-8 w-full`}>
          <View style={tw`flex-row items-center mb-2`}>
            <Ionicons
              name="information-circle"
              size={20}
              color={tw.color("neutral-600")}
            />
            <Text style={tw`text-neutral-800 font-medium ml-2`}>
              What does this mean?
            </Text>
          </View>
          <Text style={tw`text-neutral-600`}>
            This is an estimate based on your photo and provided measurements.
            Body fat percentage is a key indicator of overall health and
            fitness.
          </Text>
        </View>

        <Button title="Continue" onPress={handleNext} style={tw`w-full`} />
      </View>
    </Container>
  );
};

export default BodyFatResultsScreen;
