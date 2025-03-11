import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../utils/tw";
import { useNavigation } from "@react-navigation/native";

const Header = ({
  title,
  showBackButton = true,
  rightComponent,
  style = {},
}) => {
  const navigation = useNavigation();

  return (
    <View style={[tw`flex-row items-center justify-between py-4`, style]}>
      <View style={tw`flex-row items-center`}>
        {showBackButton && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`mr-2 p-2`}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={tw.color("neutral-800")}
            />
          </TouchableOpacity>
        )}
        <Text style={tw`text-xl font-bold text-neutral-800`}>{title}</Text>
      </View>
      {rightComponent && <View>{rightComponent}</View>}
    </View>
  );
};

export default Header;
