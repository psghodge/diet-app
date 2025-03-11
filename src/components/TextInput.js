import React from "react";
import { View, TextInput as RNTextInput, Text } from "react-native";
import tw from "../utils/tw";

const TextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  style = {},
  inputStyle = {},
}) => {
  return (
    <View style={[tw`mb-4`, style]}>
      {label && (
        <Text style={tw`text-neutral-700 font-medium mb-1`}>{label}</Text>
      )}
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[
          tw`bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800`,
          error ? tw`border-error` : {},
          inputStyle,
        ]}
      />
      {error && <Text style={tw`text-error text-sm mt-1`}>{error}</Text>}
    </View>
  );
};

export default TextInput;
