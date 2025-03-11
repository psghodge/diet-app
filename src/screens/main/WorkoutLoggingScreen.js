import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

// Mock workout types
const WORKOUT_TYPES = [
  { id: 1, name: "Running", caloriesPerMinute: 10, icon: "walk" },
  { id: 2, name: "Cycling", caloriesPerMinute: 8, icon: "bicycle" },
  { id: 3, name: "Swimming", caloriesPerMinute: 9, icon: "water" },
  { id: 4, name: "Weight Training", caloriesPerMinute: 6, icon: "barbell" },
  { id: 5, name: "Yoga", caloriesPerMinute: 4, icon: "body" },
  { id: 6, name: "HIIT", caloriesPerMinute: 12, icon: "fitness" },
  { id: 7, name: "Walking", caloriesPerMinute: 5, icon: "footsteps" },
  { id: 8, name: "Elliptical", caloriesPerMinute: 7, icon: "trending-up" },
];

const WorkoutLoggingScreen = ({ navigation }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [duration, setDuration] = useState("30");
  const [intensity, setIntensity] = useState("medium");

  const intensityMultiplier = {
    low: 0.8,
    medium: 1,
    high: 1.2,
  };

  const calculateCaloriesBurned = () => {
    if (!selectedWorkout) return 0;

    const durationNum = parseInt(duration) || 0;
    const multiplier = intensityMultiplier[intensity] || 1;

    return Math.round(
      selectedWorkout.caloriesPerMinute * durationNum * multiplier
    );
  };

  const handleSave = () => {
    const workoutData = {
      type: selectedWorkout.name,
      duration: parseInt(duration) || 0,
      intensity,
      caloriesBurned: calculateCaloriesBurned(),
      date: new Date().toISOString(),
    };

    // Here we would normally save the workout to a database
    // For now, just navigate back to the dashboard
    navigation.navigate("Dashboard", {
      workoutLogged: true,
      workoutData,
    });
  };

  return (
    <Container>
      <Header
        title="Log Workout"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-6 py-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Select Workout Type</Text>

          <View style={styles.workoutTypesGrid}>
            {WORKOUT_TYPES.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                style={[
                  styles.workoutTypeItem,
                  selectedWorkout?.id === workout.id &&
                    styles.selectedWorkoutItem,
                ]}
                onPress={() => setSelectedWorkout(workout)}
              >
                <Ionicons
                  name={workout.icon}
                  size={28}
                  color={
                    selectedWorkout?.id === workout.id ? "#fff" : "#3B82F6"
                  }
                />
                <Text
                  style={[
                    tw`mt-2 text-center`,
                    selectedWorkout?.id === workout.id
                      ? tw`text-white`
                      : tw`text-gray-700`,
                  ]}
                >
                  {workout.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={tw`text-xl font-bold mt-6 mb-4`}>Workout Details</Text>

          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Duration (minutes)</Text>
              <TextInput
                style={styles.input}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                placeholder="Enter duration"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Intensity</Text>
              <View style={styles.intensityContainer}>
                <TouchableOpacity
                  style={[
                    styles.intensityButton,
                    intensity === "low" && styles.selectedIntensityButton,
                  ]}
                  onPress={() => setIntensity("low")}
                >
                  <Text
                    style={[
                      styles.intensityButtonText,
                      intensity === "low" && styles.selectedIntensityButtonText,
                    ]}
                  >
                    Low
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.intensityButton,
                    intensity === "medium" && styles.selectedIntensityButton,
                  ]}
                  onPress={() => setIntensity("medium")}
                >
                  <Text
                    style={[
                      styles.intensityButtonText,
                      intensity === "medium" &&
                        styles.selectedIntensityButtonText,
                    ]}
                  >
                    Medium
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.intensityButton,
                    intensity === "high" && styles.selectedIntensityButton,
                  ]}
                  onPress={() => setIntensity("high")}
                >
                  <Text
                    style={[
                      styles.intensityButtonText,
                      intensity === "high" &&
                        styles.selectedIntensityButtonText,
                    ]}
                  >
                    High
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.caloriesSummary}>
            <Text style={tw`text-lg font-medium`}>
              Estimated Calories Burned:
            </Text>
            <Text style={styles.caloriesValue}>
              {calculateCaloriesBurned()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!selectedWorkout || !duration) && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!selectedWorkout || !duration}
        >
          <Text style={styles.saveButtonText}>Save Workout</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  workoutTypesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  workoutTypeItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedWorkoutItem: {
    backgroundColor: "#3B82F6",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  intensityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  intensityButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  intensityButtonText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  selectedIntensityButton: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  selectedIntensityButtonText: {
    color: "#fff",
  },
  caloriesSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default WorkoutLoggingScreen;
