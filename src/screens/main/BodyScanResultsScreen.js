import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";

const BodyScanResultsScreen = ({ navigation, route }) => {
  const { bodyFatPercentage, photoUri } = route.params;

  const handleSave = () => {
    // In a real app, this would update the user's profile with the new body fat percentage
    // For now, we'll just navigate back to the dashboard with the updated value
    navigation.navigate("Dashboard", { updatedBodyFat: bodyFatPercentage });
  };

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
          Body Scan Results
        </Text>
      </View>

      <View style={tw`flex-1 items-center justify-center p-6`}>
        <View style={tw`bg-primary bg-opacity-10 rounded-full p-8 mb-6`}>
          <Text style={tw`text-5xl font-bold text-primary text-center`}>
            {bodyFatPercentage}%
          </Text>
        </View>

        <Text style={tw`text-2xl font-bold text-center mb-2`}>
          Your Body Fat Percentage
        </Text>

        <Text style={tw`text-neutral-600 text-center mb-8`}>
          This is an estimate based on your photo. For more accurate results,
          consider consulting with a fitness professional.
        </Text>

        {photoUri && (
          <View style={tw`mb-8 rounded-xl overflow-hidden shadow-md`}>
            <Image
              source={{ uri: photoUri }}
              style={tw`w-64 h-64`}
              resizeMode="cover"
            />
          </View>
        )}

        <Button
          title="Save Results"
          onPress={handleSave}
          variant="primary"
          style={tw`w-full`}
        />

        <TouchableOpacity
          style={tw`mt-4`}
          onPress={() => navigation.navigate("BodyScanCamera")}
        >
          <Text style={tw`text-primary font-medium`}>Retake Photo</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default BodyScanResultsScreen;
