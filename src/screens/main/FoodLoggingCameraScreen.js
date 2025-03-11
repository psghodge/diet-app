import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

const FoodLoggingCameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        navigation.navigate("FoodLoggingLoading", { photoUri: photo.uri });
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <Container>
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Requesting camera permission...</Text>
        </View>
      </Container>
    );
  }

  if (hasPermission === false) {
    return (
      <Container>
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <Text style={tw`text-lg text-center mb-4`}>
            Camera access is required to use this feature.
          </Text>
          <TouchableOpacity
            style={tw`bg-primary py-3 px-6 rounded-full`}
            onPress={() => navigation.goBack()}
          >
            <Text style={tw`text-white font-medium`}>Go Back</Text>
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

      <Camera
        style={tw`flex-1`}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
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
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
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
