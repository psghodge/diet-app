import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Header from "../../components/Header";

const GoalSelectionScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    {
      id: "weight_loss",
      title: "Weight Loss",
      description: "Reduce body fat and improve overall health",
      icon: "trending-down",
      color: "primary",
    },
    {
      id: "muscle_gain",
      title: "Muscle Gain",
      description: "Build strength and increase muscle mass",
      icon: "fitness",
      color: "secondary",
    },
    {
      id: "maintenance",
      title: "Maintenance",
      description: "Maintain current weight and improve fitness",
      icon: "sync",
      color: "accent",
    },
  ];

  const handleNext = () => {
    if (!selectedGoal) return;
    navigation.navigate("DietaryRecommendations");
  };

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="Your Goal" />

      <View style={tw`flex-1 justify-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-2`}>
          Select Your Goal
        </Text>

        <Text style={tw`text-neutral-600 mb-8`}>
          This will help us tailor your diet and exercise recommendations
        </Text>

        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              tw`p-4 border rounded-xl mb-4 flex-row items-center`,
              selectedGoal === goal.id
                ? tw`border-${goal.color} bg-${goal.color} bg-opacity-10`
                : tw`border-neutral-200`,
            ]}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <View
              style={[
                tw`w-12 h-12 rounded-full items-center justify-center mr-4`,
                selectedGoal === goal.id
                  ? tw`bg-${goal.color}`
                  : tw`bg-neutral-100`,
              ]}
            >
              <Ionicons
                name={goal.icon}
                size={24}
                color={
                  selectedGoal === goal.id
                    ? tw.color("white")
                    : tw.color(`${goal.color}`)
                }
              />
            </View>

            <View style={tw`flex-1`}>
              <Text
                style={[
                  tw`font-bold text-lg`,
                  selectedGoal === goal.id
                    ? tw`text-${goal.color}`
                    : tw`text-neutral-800`,
                ]}
              >
                {goal.title}
              </Text>
              <Text
                style={[
                  tw`text-sm`,
                  selectedGoal === goal.id
                    ? tw`text-${goal.color} opacity-80`
                    : tw`text-neutral-600`,
                ]}
              >
                {goal.description}
              </Text>
            </View>

            {selectedGoal === goal.id && (
              <Ionicons
                name="checkmark-circle"
                size={24}
                color={tw.color(`${goal.color}`)}
              />
            )}
          </TouchableOpacity>
        ))}

        <Button
          title="Next"
          onPress={handleNext}
          disabled={!selectedGoal}
          style={tw`mt-6`}
        />
      </View>
    </Container>
  );
};

export default GoalSelectionScreen;
