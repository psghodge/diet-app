import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";

const FoodScanResultsScreen = ({ navigation, route }) => {
  const { name, calories, carbs, fat, protein, photoUri } = route.params;

  const handleLogFood = () => {
    // Navigate to the food logging edit screen with the scanned food data
    navigation.navigate("FoodLoggingEdit", {
      foodItem: {
        name,
        calories,
        carbs,
        fat,
        protein,
        photoUri,
      },
    });
  };

  const handleDone = () => {
    // Just go back to the dashboard
    navigation.navigate("Dashboard");
  };

  const NutrientRow = ({ label, value, unit, icon, color }) => (
    <View style={tw`flex-row items-center py-3 border-b border-neutral-100`}>
      <View
        style={tw`w-10 h-10 rounded-full bg-${color} bg-opacity-10 items-center justify-center mr-4`}
      >
        <Ionicons name={icon} size={20} color={tw.color(color)} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-neutral-600 text-sm`}>{label}</Text>
        <Text style={tw`text-neutral-800 font-bold`}>
          {value} {unit}
        </Text>
      </View>
    </View>
  );

  return (
    <Container>
      <View style={tw`flex-row items-center mb-6`}>
        <TouchableOpacity
          style={tw`p-2 mr-4`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={tw.color("neutral-700")}
          />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-neutral-800`}>
          Food Analysis
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {photoUri && (
          <View style={tw`mb-6 rounded-xl overflow-hidden shadow-md`}>
            <Image
              source={{ uri: photoUri }}
              style={tw`w-full h-48`}
              resizeMode="cover"
            />
          </View>
        )}

        <View style={tw`bg-white rounded-xl p-5 shadow-sm mb-6`}>
          <Text style={tw`text-2xl font-bold text-neutral-800 mb-4`}>
            {name}
          </Text>

          <NutrientRow
            label="Calories"
            value={calories}
            unit="kcal"
            icon="flame"
            color="secondary"
          />
          <NutrientRow
            label="Carbohydrates"
            value={carbs}
            unit="g"
            icon="pie-chart"
            color="yellow-500"
          />
          <NutrientRow
            label="Fat"
            value={fat}
            unit="g"
            icon="water"
            color="red-500"
          />
          <NutrientRow
            label="Protein"
            value={protein}
            unit="g"
            icon="barbell"
            color="blue-500"
          />
        </View>

        <View style={tw`flex-row mb-4`}>
          <Button
            title="Log This Food"
            onPress={handleLogFood}
            variant="primary"
            style={tw`flex-1 mr-2`}
          />
          <Button
            title="Done"
            onPress={handleDone}
            variant="outline"
            style={tw`flex-1 ml-2`}
          />
        </View>

        <TouchableOpacity
          style={tw`items-center mb-6`}
          onPress={() => navigation.navigate("FoodScanCamera")}
        >
          <Text style={tw`text-primary font-medium`}>Scan Another Food</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default FoodScanResultsScreen;
