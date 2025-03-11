import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

// Mock food database
const FOOD_DATABASE = [
  { id: 1, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 2, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  {
    id: 3,
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
  },
  {
    id: 4,
    name: "Brown Rice (1 cup)",
    calories: 216,
    protein: 5,
    carbs: 45,
    fat: 1.8,
  },
  {
    id: 5,
    name: "Broccoli (1 cup)",
    calories: 55,
    protein: 3.7,
    carbs: 11.2,
    fat: 0.6,
  },
  {
    id: 6,
    name: "Salmon (4 oz)",
    calories: 233,
    protein: 25,
    carbs: 0,
    fat: 15,
  },
  { id: 7, name: "Egg", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
  {
    id: 8,
    name: "Avocado (1/2)",
    calories: 161,
    protein: 2,
    carbs: 8.5,
    fat: 15,
  },
  {
    id: 9,
    name: "Greek Yogurt (1 cup)",
    calories: 130,
    protein: 22,
    carbs: 8,
    fat: 0,
  },
  {
    id: 10,
    name: "Almonds (1 oz)",
    calories: 164,
    protein: 6,
    carbs: 6,
    fat: 14,
  },
];

const FoodLoggingManualEntryScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoods, setSelectedFoods] = useState([]);

  const filteredFoods = searchQuery
    ? FOOD_DATABASE.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const addFoodToSelection = (food) => {
    setSelectedFoods([...selectedFoods, { ...food, quantity: 1 }]);
    setSearchQuery("");
  };

  const updateFoodQuantity = (index, quantity) => {
    const updatedFoods = [...selectedFoods];
    updatedFoods[index] = {
      ...updatedFoods[index],
      quantity: Math.max(1, parseInt(quantity) || 1),
    };
    setSelectedFoods(updatedFoods);
  };

  const removeFood = (index) => {
    const updatedFoods = [...selectedFoods];
    updatedFoods.splice(index, 1);
    setSelectedFoods(updatedFoods);
  };

  const calculateTotals = () => {
    return selectedFoods.reduce(
      (totals, item) => {
        const quantity = item.quantity || 1;
        return {
          totalCalories: totals.totalCalories + item.calories * quantity,
          totalProtein: totals.totalProtein + item.protein * quantity,
          totalCarbs: totals.totalCarbs + item.carbs * quantity,
          totalFat: totals.totalFat + item.fat * quantity,
        };
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    );
  };

  const handleSave = () => {
    const foodItems = selectedFoods.map((item) => ({
      name: `${item.name} ${item.quantity > 1 ? `(${item.quantity})` : ""}`,
      calories: item.calories * item.quantity,
      protein: item.protein * item.quantity,
      carbs: item.carbs * item.quantity,
      fat: item.fat * item.quantity,
    }));

    const analysisResult = {
      foodItems,
      ...calculateTotals(),
    };

    navigation.navigate("FoodLoggingResults", {
      analysisResult,
    });
  };

  const totals = calculateTotals();

  return (
    <Container>
      <Header
        title="Manual Food Entry"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={tw`px-6 pt-4`}>
        <Text style={tw`text-lg font-medium mb-2`}>Search for food</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6B7280" style={tw`mr-2`} />
          <TextInput
            style={tw`flex-1`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Type food name..."
          />
        </View>
      </View>

      {searchQuery.length > 0 && (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id.toString()}
          style={tw`mx-6 mt-2 max-h-40`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.searchResultItem}
              onPress={() => addFoodToSelection(item)}
            >
              <View>
                <Text style={tw`font-medium`}>{item.name}</Text>
                <Text style={tw`text-gray-500 text-sm`}>
                  {item.calories} cal | P: {item.protein}g | C: {item.carbs}g |
                  F: {item.fat}g
                </Text>
              </View>
              <Ionicons name="add-circle" size={24} color="#3B82F6" />
            </TouchableOpacity>
          )}
        />
      )}

      <View style={tw`flex-1 px-6 pt-4`}>
        <Text style={tw`text-xl font-bold mb-4`}>Selected Foods</Text>

        {selectedFoods.length === 0 ? (
          <View style={tw`items-center justify-center py-8`}>
            <Text style={tw`text-gray-500 text-center`}>
              Search and add foods to your log
            </Text>
          </View>
        ) : (
          <FlatList
            data={selectedFoods}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.selectedFoodItem}>
                <View style={tw`flex-1`}>
                  <Text style={tw`font-medium`}>{item.name}</Text>
                  <Text style={tw`text-gray-500 text-sm`}>
                    {item.calories * (item.quantity || 1)} cal | P:{" "}
                    {(item.protein * (item.quantity || 1)).toFixed(1)}g | C:{" "}
                    {(item.carbs * (item.quantity || 1)).toFixed(1)}g | F:{" "}
                    {(item.fat * (item.quantity || 1)).toFixed(1)}g
                  </Text>
                </View>

                <View style={tw`flex-row items-center`}>
                  <Text style={tw`mr-2`}>Qty:</Text>
                  <TextInput
                    style={styles.quantityInput}
                    value={item.quantity?.toString() || "1"}
                    onChangeText={(value) => updateFoodQuantity(index, value)}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    style={tw`ml-3`}
                    onPress={() => removeFood(index)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

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
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={selectedFoods.length === 0}
        >
          <Text style={styles.saveButtonText}>Save to Log</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchResultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  selectedFoodItem: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  quantityInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 50,
    textAlign: "center",
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

export default FoodLoggingManualEntryScreen;
