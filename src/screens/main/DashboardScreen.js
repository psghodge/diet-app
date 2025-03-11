import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";

const DashboardScreen = ({ navigation, route }) => {
  // In a real app, this would come from the user's profile
  const [userStats, setUserStats] = useState({
    weight: 70,
    bodyFat: 22,
    goalWeight: 65,
    progress: 0.4, // 40% progress towards goal
    dailyCalories: 1800,
    remainingCalories: 1200,
  });

  // Check if we have an updated body fat percentage from the body scan
  useEffect(() => {
    if (route.params?.updatedBodyFat) {
      setUserStats((prevStats) => ({
        ...prevStats,
        bodyFat: route.params.updatedBodyFat,
      }));
      // Clear the params to avoid re-updating on re-render
      navigation.setParams({ updatedBodyFat: undefined });
    }
  }, [route.params?.updatedBodyFat, navigation]);

  const handleUpdateBodyFat = () => {
    navigation.navigate("BodyScanCamera");
  };

  const handleUpdateWeight = () => {
    // This would navigate to a weight update screen in a real app
    // For now, we'll just simulate a weight update
    alert("Weight update feature coming soon!");
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

  const handleFoodScan = () => {
    navigation.navigate("FoodScanCamera");
  };

  const StatCard = ({ title, value, unit, icon, color, onUpdate }) => (
    <View style={tw`bg-white rounded-xl p-4 shadow-sm flex-1 mx-1`}>
      <View style={tw`flex-row items-center justify-between mb-2`}>
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`w-8 h-8 rounded-full bg-${color} bg-opacity-10 items-center justify-center mr-2`}
          >
            <Ionicons name={icon} size={16} color={tw.color(color)} />
          </View>
          <Text style={tw`text-neutral-600 text-xs`}>{title}</Text>
        </View>
      </View>
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-1 items-center`}>
          <Text style={tw`text-xl font-bold text-neutral-800`}>
            {value}
            <Text style={tw`text-sm font-normal text-neutral-500`}>
              {" "}
              {unit}
            </Text>
          </Text>
        </View>
        {onUpdate && (
          <TouchableOpacity onPress={onUpdate} style={tw`ml-2`}>
            <Ionicons
              name={title === "Body Fat" ? "camera" : "pencil"}
              size={title === "Body Fat" ? 22 : 18}
              color={tw.color("neutral-700")}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <Container statusBarColor="dark">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-row justify-between items-center mb-8`}>
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

        <View style={tw`bg-primary bg-opacity-5 rounded-xl p-5 mb-8`}>
          <Text style={tw`text-lg font-bold text-neutral-800 mb-3`}>
            Your Stats
          </Text>

          <View style={tw`flex-row mb-6`}>
            <StatCard
              title="Current Weight"
              value={userStats.weight}
              unit="kg"
              icon="scale"
              color="primary"
              onUpdate={handleUpdateWeight}
            />
            <StatCard
              title="Body Fat"
              value={userStats.bodyFat}
              unit="%"
              icon="body"
              color="accent"
              onUpdate={handleUpdateBodyFat}
            />
          </View>

          <Text style={tw`text-sm text-neutral-600 mb-4`}>
            Progress to Goal ({userStats.weight} kg → {userStats.goalWeight} kg)
          </Text>

          <View
            style={tw`h-4 bg-neutral-200 rounded-full overflow-hidden mb-2`}
          >
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

        <View style={tw`bg-secondary bg-opacity-5 rounded-xl p-5 mb-10`}>
          <Text style={tw`text-lg font-bold text-neutral-800 mb-4 text-center`}>
            Today's Nutrition
          </Text>

          <View style={tw`flex-row items-center justify-between mb-3`}>
            <View style={tw`items-center flex-1`}>
              <Text style={tw`text-neutral-600 text-xs mb-1`}>
                Daily Target
              </Text>
              <Text style={tw`text-lg font-bold text-neutral-800`}>
                {userStats.dailyCalories} kcal
              </Text>
            </View>

            <View style={tw`h-16 w-px bg-neutral-200`} />

            <View style={tw`items-center flex-1`}>
              <Text style={tw`text-neutral-600 text-xs mb-1`}>Remaining</Text>
              <Text style={tw`text-lg font-bold text-secondary`}>
                {userStats.remainingCalories} kcal
              </Text>
            </View>

            <View style={tw`h-16 w-px bg-neutral-200`} />

            <View style={tw`items-center flex-1`}>
              <Text style={tw`text-neutral-600 text-xs mb-1`}>
                Food Scanner
              </Text>
              <TouchableOpacity onPress={handleFoodScan}>
                <Ionicons name="camera" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw`flex-row justify-between mb-6`}>
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
            variant="outline"
          />
        </View>

        <Button
          title="View Progress"
          onPress={handleViewProgress}
          variant="outline"
          style={tw`mb-10`}
        />
      </ScrollView>
    </Container>
  );
};

export default DashboardScreen;
