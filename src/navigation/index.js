import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Auth Screens
import LoginScreen from "../screens/auth/LoginScreen.js";

// Onboarding Screens
import AgeScreen from "../screens/onboarding/AgeScreen";
import SexScreen from "../screens/onboarding/SexScreen";
import WeightScreen from "../screens/onboarding/WeightScreen";
import HeightScreen from "../screens/onboarding/HeightScreen";
import PhotoScreen from "../screens/onboarding/PhotoScreen";
import BodyFatResultsScreen from "../screens/onboarding/BodyFatResultsScreen";
import GoalSelectionScreen from "../screens/onboarding/GoalSelectionScreen";
import DietaryRecommendationsScreen from "../screens/onboarding/DietaryRecommendationsScreen";

// Main Screens
import DashboardScreen from "../screens/main/DashboardScreen";
import FoodLoggingChooseMethodScreen from "../screens/main/FoodLoggingChooseMethodScreen";
import FoodLoggingCameraScreen from "../screens/main/FoodLoggingCameraScreen";
import FoodLoggingLoadingScreen from "../screens/main/FoodLoggingLoadingScreen";
import FoodLoggingResultsScreen from "../screens/main/FoodLoggingResultsScreen";
import FoodLoggingEditScreen from "../screens/main/FoodLoggingEditScreen";
import FoodLoggingManualEntryScreen from "../screens/main/FoodLoggingManualEntryScreen";
import WorkoutLoggingScreen from "../screens/main/WorkoutLoggingScreen";
import ProgressTrackerDateSelectionScreen from "../screens/main/ProgressTrackerDateSelectionScreen";
import ProgressTrackerDailyLogViewScreen from "../screens/main/ProgressTrackerDailyLogViewScreen";

// Create stack navigators
const AuthStack = createStackNavigator();
const OnboardingStack = createStackNavigator();
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// Onboarding Navigator
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStack.Screen name="Age" component={AgeScreen} />
    <OnboardingStack.Screen name="Sex" component={SexScreen} />
    <OnboardingStack.Screen name="Weight" component={WeightScreen} />
    <OnboardingStack.Screen name="Height" component={HeightScreen} />
    <OnboardingStack.Screen name="Photo" component={PhotoScreen} />
    <OnboardingStack.Screen
      name="BodyFatResults"
      component={BodyFatResultsScreen}
    />
    <OnboardingStack.Screen
      name="GoalSelection"
      component={GoalSelectionScreen}
    />
    <OnboardingStack.Screen
      name="DietaryRecommendations"
      component={DietaryRecommendationsScreen}
    />
  </OnboardingStack.Navigator>
);

// Main App Navigator
const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Dashboard" component={DashboardScreen} />
    <MainStack.Screen
      name="FoodLoggingChooseMethod"
      component={FoodLoggingChooseMethodScreen}
    />
    <MainStack.Screen
      name="FoodLoggingCamera"
      component={FoodLoggingCameraScreen}
    />
    <MainStack.Screen
      name="FoodLoggingLoading"
      component={FoodLoggingLoadingScreen}
    />
    <MainStack.Screen
      name="FoodLoggingResults"
      component={FoodLoggingResultsScreen}
    />
    <MainStack.Screen
      name="FoodLoggingEdit"
      component={FoodLoggingEditScreen}
    />
    <MainStack.Screen
      name="FoodLoggingManualEntry"
      component={FoodLoggingManualEntryScreen}
    />
    <MainStack.Screen name="WorkoutLogging" component={WorkoutLoggingScreen} />
    <MainStack.Screen
      name="ProgressTrackerDateSelection"
      component={ProgressTrackerDateSelectionScreen}
    />
    <MainStack.Screen
      name="ProgressTrackerDailyLogView"
      component={ProgressTrackerDailyLogViewScreen}
    />
  </MainStack.Navigator>
);

// Root Navigator
const AppNavigator = () => {
  // Here we would normally check if the user is authenticated
  // and if they've completed onboarding
  const isAuthenticated = true;
  const hasCompletedOnboarding = true;

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{ headerShown: false, presentation: "modal" }}
      >
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : !hasCompletedOnboarding ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
