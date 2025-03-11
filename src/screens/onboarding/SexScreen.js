import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Header from "../../components/Header";

const SexScreen = ({ navigation }) => {
  const [selectedSex, setSelectedSex] = useState(null);

  const handleNext = () => {
    if (!selectedSex) {
      // Show error or feedback
      return;
    }

    navigation.navigate("Weight");
  };

  const SexOption = ({ value, label, icon }) => (
    <TouchableOpacity
      style={[
        tw`flex-1 items-center justify-center py-6 rounded-xl border mx-2`,
        selectedSex === value
          ? tw`border-primary bg-primary bg-opacity-10`
          : tw`border-neutral-200 bg-neutral-50`,
      ]}
      onPress={() => setSelectedSex(value)}
    >
      <Ionicons
        name={icon}
        size={32}
        color={
          selectedSex === value ? tw.color("primary") : tw.color("neutral-400")
        }
      />
      <Text
        style={[
          tw`mt-2 font-medium`,
          selectedSex === value ? tw`text-primary` : tw`text-neutral-600`,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Container scrollable={false} statusBarColor="dark">
      <Header title="About You" />

      <View style={tw`flex-1 justify-center px-6`}>
        <Text style={tw`text-3xl font-bold text-neutral-800 mb-2`}>
          Select Your Sex
        </Text>

        <Text style={tw`text-neutral-600 mb-8`}>
          This helps us calculate your body metrics accurately
        </Text>

        <View style={tw`flex-row justify-between mb-8`}>
          <SexOption value="male" label="Male" icon="male" />
          <SexOption value="female" label="Female" icon="female" />
          <SexOption value="other" label="Other" icon="person" />
        </View>

        <Button title="Next" onPress={handleNext} disabled={!selectedSex} />
      </View>
    </Container>
  );
};

export default SexScreen;
