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

const FoodLoggingEditScreen = ({ route, navigation }) => {
  const { photoUri, analysisResult } = route.params || {};
  const [foodItems, setFoodItems] = useState(analysisResult?.foodItems || []);

  const updateFoodItem = (index, field, value) => {
    const updatedItems = [...foodItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "name" ? value : Number(value),
    };
    setFoodItems(updatedItems);
  };

  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { name: "", calories: 0, protein: 0, carbs: 0, fat: 0 },
    ]);
  };

  const removeFoodItem = (index) => {
    const updatedItems = [...foodItems];
    updatedItems.splice(index, 1);
    setFoodItems(updatedItems);
  };

  const calculateTotals = () => {
    return foodItems.reduce(
      (totals, item) => {
        return {
          totalCalories: totals.totalCalories + (item.calories || 0),
          totalProtein: totals.totalProtein + (item.protein || 0),
          totalCarbs: totals.totalCarbs + (item.carbs || 0),
          totalFat: totals.totalFat + (item.fat || 0),
        };
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    );
  };

  const handleSave = () => {
    const updatedResult = {
      ...analysisResult,
      foodItems,
      ...calculateTotals(),
    };

    navigation.navigate("FoodLoggingResults", {
      photoUri,
      analysisResult: updatedResult,
    });
  };

  const totals = calculateTotals();

  return (
    <Container>
      <Header
        title="Edit Food Log"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={tw`flex-1`}>
        <View style={tw`px-6 py-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Nutritional Summary</Text>

          <View style={styles.nutritionSummary}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{totals.totalCalories}</Text>
              <Text style={styles.nutritionLabel}>Calories</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {totals.totalProtein.toFixed(1)}g
              </Text>
              <Text style={styles.nutritionLabel}>Protein</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {totals.totalCarbs.toFixed(1)}g
              </Text>
              <Text style={styles.nutritionLabel}>Carbs</Text>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>
                {totals.totalFat.toFixed(1)}g
              </Text>
              <Text style={styles.nutritionLabel}>Fat</Text>
            </View>
          </View>

          <Text style={tw`text-xl font-bold mt-6 mb-4`}>Food Items</Text>

          {foodItems.map((item, index) => (
            <View key={index} style={styles.foodItemEdit}>
              <View style={tw`flex-1`}>
                <View style={tw`flex-row justify-between items-center mb-2`}>
                  <Text style={tw`font-medium`}>Food Item</Text>
                  <TouchableOpacity onPress={() => removeFoodItem(index)}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  value={item.name}
                  onChangeText={(value) => updateFoodItem(index, "name", value)}
                  placeholder="Food name"
                />

                <View style={tw`flex-row mt-3`}>
                  <View style={tw`flex-1 mr-2`}>
                    <Text style={tw`font-medium mb-1`}>Calories</Text>
                    <TextInput
                      style={styles.input}
                      value={item.calories.toString()}
                      onChangeText={(value) =>
                        updateFoodItem(index, "calories", value)
                      }
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={tw`flex-1 ml-2`}>
                    <Text style={tw`font-medium mb-1`}>Protein (g)</Text>
                    <TextInput
                      style={styles.input}
                      value={item.protein.toString()}
                      onChangeText={(value) =>
                        updateFoodItem(index, "protein", value)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={tw`flex-row mt-3`}>
                  <View style={tw`flex-1 mr-2`}>
                    <Text style={tw`font-medium mb-1`}>Carbs (g)</Text>
                    <TextInput
                      style={styles.input}
                      value={item.carbs.toString()}
                      onChangeText={(value) =>
                        updateFoodItem(index, "carbs", value)
                      }
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={tw`flex-1 ml-2`}>
                    <Text style={tw`font-medium mb-1`}>Fat (g)</Text>
                    <TextInput
                      style={styles.input}
                      value={item.fat.toString()}
                      onChangeText={(value) =>
                        updateFoodItem(index, "fat", value)
                      }
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addFoodItem}>
            <Ionicons name="add" size={20} color="#3B82F6" />
            <Text style={styles.addButtonText}>Add Food Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  foodItemEdit: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  addButtonText: {
    color: "#3B82F6",
    fontWeight: "600",
    marginLeft: 8,
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
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default FoodLoggingEditScreen;
