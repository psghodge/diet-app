import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

const FoodLoggingResultsScreen = ({ route, navigation }) => {
  const { photoUri, analysisResult } = route.params || {};
  const { foodItems, totalCalories, totalProtein, totalCarbs, totalFat } =
    analysisResult || {
      foodItems: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };

  const handleSave = () => {
    // Here we would normally save the food log to a database
    // For now, just navigate back to the dashboard
    navigation.navigate("Dashboard", {
      foodLogged: true,
      mealData: analysisResult,
    });
  };

  const handleEdit = () => {
    navigation.navigate("FoodLoggingEdit", {
      photoUri,
      analysisResult,
    });
  };

  return (
    <Container>
      <Header
        title="Food Analysis"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={tw`flex-1`}>
        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={styles.foodImage}
            resizeMode="cover"
          />
        )}

        <View style={tw`px-6 py-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Nutritional Summary</Text>

          <View style={styles.nutritionSummary}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{totalCalories}</Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{totalProtein}g</Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{totalCarbs}g</Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{totalFat}g</Text>
              <Text style={styles.nutritionLabel}>Fat</Text>
            </View>
          </View>

          <Text style={tw`text-xl font-bold mt-6 mb-4`}>
            Detected Food Items
          </Text>

          {foodItems.map((item, index) => (
            <View key={index} style={styles.foodItem}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-medium`}>{item.name}</Text>
                <Text style={tw`text-gray-500 mt-1`}>
                  {item.calories} cal | P: {item.protein}g | C: {item.carbs}g |
                  F: {item.fat}g
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={handleEdit}
        >
          <Ionicons name="create-outline" size={20} color="#3B82F6" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save to Log</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  foodImage: {
    width: "100%",
    height: 200,
  },
  nutritionSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  nutritionLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
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
  buttonContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#EFF6FF",
    marginRight: 12,
    flex: 1,
  },
  editButtonText: {
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#3B82F6",
    flex: 2,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default FoodLoggingResultsScreen;
