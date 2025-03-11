import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";

const FoodScanCameraScreen = ({ navigation }) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
        });
        navigation.navigate("FoodScanLoading", { photoUri: photo.uri });
      } catch (error) {
        Alert.alert("Error", "Failed to take picture. Please try again.");
        console.error("Camera error:", error);
      }
    }
  };

  if (!permission) {
    return (
      <Container>
        <View style={tw`flex-1 items-center justify-center`}>
          <Text>Requesting camera permission...</Text>
        </View>
      </Container>
    );
  }

  if (!permission.granted) {
    return (
      <Container>
        <View style={tw`flex-1 items-center justify-center p-6`}>
          <Ionicons
            name="camera-off"
            size={64}
            color={tw.color("neutral-400")}
            style={tw`mb-4`}
          />
          <Text style={tw`text-xl font-bold text-center mb-2`}>
            Camera Access Required
          </Text>
          <Text style={tw`text-neutral-600 text-center mb-6`}>
            We need camera access to analyze your food. Please enable camera
            access in your device settings.
          </Text>
          <Button
            title="Grant Permission"
            onPress={requestPermission}
            variant="primary"
            style={tw`mb-4`}
          />
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </Container>
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      {Platform.OS === "ios" && Platform.isPad ? (
        // Fallback for simulator or iPad
        <View style={tw`flex-1 items-center justify-center bg-black`}>
          <Text style={tw`text-white text-lg mb-4`}>
            Camera preview may not work in the simulator
          </Text>
          <Button
            title="Take Mock Photo"
            onPress={() => {
              // Simulate taking a photo
              navigation.navigate("FoodLogEntryScreen", {
                scannedFood: {
                  name: "Mock Scanned Food",
                  calories: 250,
                  protein: 15,
                  carbs: 30,
                  fat: 10,
                },
              });
            }}
          />
          <TouchableOpacity
            style={tw`absolute top-10 left-5`}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView
          ref={cameraRef}
          style={tw`flex-1`}
          facing="back"
          onCameraReady={handleCameraReady}
        >
          <View style={tw`flex-1 bg-transparent`}>
            {/* Top close button */}
            <TouchableOpacity
              style={tw`absolute top-10 left-5 z-10 p-2 bg-black bg-opacity-50 rounded-full`}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close-circle" size={40} color="white" />
            </TouchableOpacity>

            {/* Guide overlay */}
            <View style={tw`flex-1 items-center justify-center`}>
              <View
                style={tw`border-2 border-white border-opacity-70 rounded-lg w-4/5 h-3/5 items-center justify-center`}
              >
                <Text style={tw`text-white text-center mb-2`}>
                  Position food in frame
                </Text>
                <Ionicons name="fast-food" size={48} color="white" />
              </View>
            </View>

            {/* Bottom controls */}
            <View
              style={tw`bg-black bg-opacity-50 p-6 flex-row items-center justify-between`}
            >
              <TouchableOpacity
                style={tw`p-2`}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`w-16 h-16 bg-white rounded-full items-center justify-center border-4 border-neutral-300`}
                onPress={takePicture}
                disabled={!cameraReady}
              >
                <View style={tw`w-12 h-12 bg-white rounded-full`} />
              </TouchableOpacity>

              <View style={tw`w-10`} />
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default FoodScanCameraScreen;
