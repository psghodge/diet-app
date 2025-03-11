import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Header from "../../components/Header";

const PhotoScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setPhotoUri(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  const handleNext = () => {
    // In a real app, we would upload the photo to analyze body fat
    // For now, we'll just navigate to the next screen
    navigation.navigate("BodyFatResults");
  };

  const handleRetake = () => {
    setPhotoUri(null);
  };

  if (hasPermission === null) {
    return (
      <Container scrollable={false} statusBarColor="dark">
        <Header title="Body Analysis" />
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Requesting camera permission...</Text>
        </View>
      </Container>
    );
  }

  if (hasPermission === false) {
    return (
      <Container scrollable={false} statusBarColor="dark">
        <Header title="Body Analysis" />
        <View style={tw`flex-1 justify-center items-center px-6`}>
          <Text style={tw`text-xl text-center mb-4`}>
            Camera access is required to analyze your body fat percentage.
          </Text>
          <Button
            title="Grant Permission"
            onPress={() => Camera.requestCameraPermissionsAsync()}
          />
        </View>
      </Container>
    );
  }

  return (
    <Container scrollable={false} safeArea={false} statusBarColor="dark">
      <View style={tw`flex-1 bg-black`}>
        {!photoUri ? (
          <>
            <View style={tw`absolute top-0 left-0 right-0 z-10`}>
              <Header title="Body Analysis" style={tw`bg-transparent`} />
            </View>

            <Camera
              ref={cameraRef}
              style={tw`flex-1`}
              type={Camera.Constants.Type.back}
              onCameraReady={() => setCameraReady(true)}
            >
              <View style={tw`flex-1 justify-between p-6`}>
                <View style={tw`mt-20`}>
                  <Text
                    style={tw`text-white text-2xl font-bold text-center mb-2`}
                  >
                    Take a Full-Body Photo
                  </Text>
                  <Text style={tw`text-white text-center opacity-80`}>
                    Stand in front of a plain background with your full body
                    visible
                  </Text>
                </View>

                <View style={tw`items-center mb-10`}>
                  <TouchableOpacity
                    onPress={takePicture}
                    disabled={!cameraReady}
                    style={[
                      tw`w-20 h-20 rounded-full bg-white items-center justify-center`,
                      styles.captureButton,
                    ]}
                  >
                    <View
                      style={tw`w-16 h-16 rounded-full border-2 border-black`}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Camera>
          </>
        ) : (
          <>
            <View style={tw`absolute top-0 left-0 right-0 z-10`}>
              <Header title="Review Photo" style={tw`bg-transparent`} />
            </View>

            <Image source={{ uri: photoUri }} style={tw`flex-1`} />

            <View
              style={tw`absolute bottom-0 left-0 right-0 p-6 flex-row justify-between`}
            >
              <Button
                title="Retake"
                onPress={handleRetake}
                variant="outline"
                style={tw`flex-1 mr-3 bg-white bg-opacity-80`}
              />
              <Button
                title="Use Photo"
                onPress={handleNext}
                style={tw`flex-1 ml-3`}
              />
            </View>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  captureButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PhotoScreen;
