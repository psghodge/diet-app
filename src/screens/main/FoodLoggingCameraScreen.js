import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

const FoodLoggingCameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        navigation.navigate("FoodLoggingLoading", { photoUri: photo.uri });
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (!permission) {
    return (
      <Container>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Requesting camera permission...</Text>
        </View>
      </Container>
    );
  }

  if (!permission.granted) {
    return (
      <Container>
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <Text style={tw`text-lg text-center mb-4`}>
            Camera access is required to use this feature.
          </Text>
          <TouchableOpacity
            style={tw`bg-primary py-3 px-6 rounded-full mb-4`}
            onPress={requestPermission}
          >
            <Text style={tw`text-white font-medium`}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`py-3 px-6 rounded-full border border-gray-300`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`font-medium`}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <Header
        title="Take Photo"
        showBackButton
        onBackPress={() => navigation.goBack()}
        style={tw`bg-transparent`}
        titleStyle={tw`text-white`}
        backButtonColor="white"
      />

      <CameraView
        style={tw`flex-1`}
        facing="back"
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      >
        <View style={styles.cameraOverlay}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>

          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
              disabled={!cameraReady}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
          </View>

          <View style={styles.cameraInstructions}>
            <Text style={tw`text-white text-center text-lg mb-2`}>
              Take a clear photo of your meal
            </Text>
            <Text style={tw`text-white text-center opacity-70`}>
              Try to include all food items in the frame
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 5,
  },
  cameraControls: {
    alignItems: "center",
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff",
  },
  cameraInstructions: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default FoodLoggingCameraScreen;
