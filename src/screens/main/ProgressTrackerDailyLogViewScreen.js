import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

// Mock food data
const MOCK_FOOD_ITEMS = [
  {
    name: "Breakfast",
    time: "08:30 AM",
    calories: 450,
    items: ["Oatmeal with berries", "Greek yogurt", "Coffee"],
  },
  {
    name: "Lunch",
    time: "12:45 PM",
    calories: 650,
    items: ["Grilled chicken salad", "Whole grain bread", "Apple"],
  },
  {
    name: "Snack",
    time: "03:30 PM",
    calories: 200,
    items: ["Protein bar", "Green tea"],
  },
  {
    name: "Dinner",
    time: "07:15 PM",
    calories: 750,
    items: ["Salmon", "Brown rice", "Steamed vegetables"],
  },
];

// Mock workout data
const MOCK_WORKOUT = {
  type: "Running",
  duration: 45,
  intensity: "medium",
  caloriesBurned: 420,
  time: "06:00 AM",
};

const ProgressTrackerDailyLogViewScreen = ({ route, navigation }) => {
  const { date, hasData, caloriesConsumed, caloriesBurned } =
    route.params || {};

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // If no data, show empty state
  if (!hasData) {
    return (
      <Container>
        <Header
          title="Daily Log"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <View style={tw`flex-1 justify-center items-center px-6`}>
          <Ionicons name="calendar-outline" size={64} color="#9CA3AF" />
          <Text style={tw`text-xl font-bold mt-4 mb-2 text-center`}>
            No Data for {formattedDate}
          </Text>
          <Text style={tw`text-gray-500 text-center`}>
            You didn't log any meals or workouts on this day.
          </Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        title="Daily Log"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-6 py-4`}>
          <Text style={tw`text-xl font-bold mb-2`}>{formattedDate}</Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{caloriesConsumed}</Text>
              <Text style={styles.summaryLabel}>Calories In</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{caloriesBurned}</Text>
              <Text style={styles.summaryLabel}>Calories Out</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <Text
                style={[
                  styles.summaryValue,
                  {
                    color:
                      caloriesConsumed - caloriesBurned > 0
                        ? "#EF4444"
                        : "#10B981",
                  },
                ]}
              >
                {caloriesConsumed - caloriesBurned}
              </Text>
              <Text style={styles.summaryLabel}>Net Calories</Text>
            </View>
          </View>

          <Text style={tw`text-xl font-bold mt-6 mb-4`}>Meals</Text>

          {MOCK_FOOD_ITEMS.map((meal, index) => (
            <View key={index} style={styles.mealContainer}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-lg font-medium`}>{meal.name}</Text>
                <Text style={tw`text-gray-500`}>{meal.time}</Text>
              </View>

              <View style={tw`flex-row justify-between items-center mb-3`}>
                <Text style={tw`text-gray-500`}>{meal.calories} calories</Text>
              </View>

              {meal.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.foodItem}>
                  <View style={styles.foodItemDot} />
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          ))}

          <Text style={tw`text-xl font-bold mt-6 mb-4`}>Workouts</Text>

          <View style={styles.workoutContainer}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-lg font-medium`}>{MOCK_WORKOUT.type}</Text>
              <Text style={tw`text-gray-500`}>{MOCK_WORKOUT.time}</Text>
            </View>

            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons
                name="time-outline"
                size={16}
                color="#6B7280"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-500 mr-4`}>
                {MOCK_WORKOUT.duration} min
              </Text>

              <Ionicons
                name="speedometer-outline"
                size={16}
                color="#6B7280"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-500 capitalize`}>
                {MOCK_WORKOUT.intensity} intensity
              </Text>
            </View>

            <View style={tw`flex-row items-center`}>
              <Ionicons
                name="flame-outline"
                size={16}
                color="#EF4444"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-700 font-medium`}>
                {MOCK_WORKOUT.caloriesBurned} calories burned
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#E5E7EB",
  },
  mealContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  foodItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6B7280",
    marginRight: 8,
  },
  workoutContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ProgressTrackerDailyLogViewScreen;
