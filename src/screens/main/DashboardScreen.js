import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";

const DashboardScreen = ({ navigation }) => {
  // In a real app, this would come from the user's profile
  const userStats = {
    weight: 70,
    bodyFat: 22,
    goalWeight: 65,
    progress: 0.4, // 40% progress towards goal
    dailyCalories: 1800,
    remainingCalories: 1200,
  };

  const handleLogFood = () => {
    navigation.navigate("FoodLoggingChooseMethod");
  };

  const handleLogWorkout = () => {
    navigation.navigate("WorkoutLogging");
  };

  const handleViewProgress = () => {
    navigation.navigate("ProgressTrackerDateSelection");
  };

  const StatCard = ({ title, value, unit, icon, color }) => (
    <View style={tw`bg-white rounded-xl p-4 shadow-sm flex-1 mx-1`}>
      <View style={tw`flex-row items-center mb-2`}>
        <View
          style={tw`w-8 h-8 rounded-full bg-${color} bg-opacity-10 items-center justify-center mr-2`}
        >
          <Ionicons name={icon} size={16} color={tw.color(color)} />
        </View>
        <Text style={tw`text-neutral-600 text-xs`}>{title}</Text>
      </View>
      <Text style={tw`text-xl font-bold text-neutral-800`}>
        {value}
        <Text style={tw`text-sm font-normal text-neutral-500`}> {unit}</Text>
      </Text>
    </View>
  );

  return (
    <Container statusBarColor="dark">
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <Text style={tw`text-2xl font-bold text-neutral-800`}>Dashboard</Text>
        <TouchableOpacity
          style={tw`w-10 h-10 rounded-full bg-neutral-100 items-center justify-center`}
          onPress={() => {
            /* Open profile/settings */
          }}
        >
          <Ionicons name="person" size={20} color={tw.color("neutral-600")} />
        </TouchableOpacity>
      </View>

      <View style={tw`bg-primary bg-opacity-5 rounded-xl p-5 mb-6`}>
        <Text style={tw`text-lg font-bold text-neutral-800 mb-1`}>
          Your Stats
        </Text>

        <View style={tw`flex-row mb-4`}>
          <StatCard
            title="Current Weight"
            value={userStats.weight}
            unit="kg"
            icon="scale"
            color="primary"
          />
          <StatCard
            title="Body Fat"
            value={userStats.bodyFat}
            unit="%"
            icon="body"
            color="accent"
          />
        </View>

        <Text style={tw`text-sm text-neutral-600 mb-2`}>
          Progress to Goal ({userStats.weight} kg → {userStats.goalWeight} kg)
        </Text>

        <View style={tw`h-3 bg-neutral-200 rounded-full overflow-hidden mb-1`}>
          <View
            style={[
              tw`h-full bg-primary rounded-full`,
              { width: `${userStats.progress * 100}%` },
            ]}
          />
        </View>

        <Text style={tw`text-xs text-neutral-500 text-right`}>
          {Math.round(userStats.progress * 100)}% Complete
        </Text>
      </View>

      <View style={tw`bg-secondary bg-opacity-5 rounded-xl p-5 mb-6`}>
        <Text style={tw`text-lg font-bold text-neutral-800 mb-3`}>
          Today's Nutrition
        </Text>

        <View style={tw`flex-row items-center justify-between mb-3`}>
          <View>
            <Text style={tw`text-neutral-600 text-xs`}>Daily Target</Text>
            <Text style={tw`text-lg font-bold text-neutral-800`}>
              {userStats.dailyCalories} kcal
            </Text>
          </View>

          <View style={tw`h-10 w-px bg-neutral-200`} />

          <View>
            <Text style={tw`text-neutral-600 text-xs`}>Remaining</Text>
            <Text style={tw`text-lg font-bold text-secondary`}>
              {userStats.remainingCalories} kcal
            </Text>
          </View>

          <TouchableOpacity
            style={tw`bg-secondary bg-opacity-10 px-3 py-2 rounded-lg`}
            onPress={handleLogFood}
          >
            <Text style={tw`text-secondary font-medium`}>Log Food</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-row justify-between mb-4`}>
        <Button
          title="Log Food"
          onPress={handleLogFood}
          style={tw`flex-1 mr-2`}
          variant="primary"
        />
        <Button
          title="Log Workout"
          onPress={handleLogWorkout}
          style={tw`flex-1 ml-2`}
          variant="secondary"
        />
      </View>

      <Button
        title="View Progress"
        onPress={handleViewProgress}
        variant="outline"
      />
    </Container>
  );
};

export default DashboardScreen;
