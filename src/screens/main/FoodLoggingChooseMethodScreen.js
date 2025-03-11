import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

const FoodLoggingChooseMethodScreen = ({ navigation }) => {
  return (
    <Container>
      <Header
        title="Log Food"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={tw`flex-1 px-6 py-8`}>
        <Text style={tw`text-lg font-medium mb-6`}>
          How would you like to log your food?
        </Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("FoodLoggingCamera")}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="camera" size={24} color="#fff" />
          </View>
          <View style={tw`flex-1 ml-4`}>
            <Text style={tw`text-lg font-medium`}>Take a Photo</Text>
            <Text style={tw`text-gray-500 mt-1`}>
              Snap a picture of your meal for automatic analysis
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("FoodLoggingManualEntry")}
        >
          <View style={[styles.iconContainer, { backgroundColor: "#4CAF50" }]}>
            <Ionicons name="create" size={24} color="#fff" />
          </View>
          <View style={tw`flex-1 ml-4`}>
            <Text style={tw`text-lg font-medium`}>Manual Entry</Text>
            <Text style={tw`text-gray-500 mt-1`}>
              Search for foods and enter portion sizes manually
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FoodLoggingChooseMethodScreen;
