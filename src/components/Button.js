import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import tw from "../utils/tw";

const Button = ({
  title,
  onPress,
  variant = "primary", // primary, secondary, outline, text
  size = "md", // sm, md, lg
  fullWidth = false,
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
}) => {
  // Button variants
  const variantStyles = {
    primary: tw`bg-primary text-white`,
    secondary: tw`bg-secondary text-white`,
    accent: tw`bg-accent text-white`,
    outline: tw`bg-transparent border border-primary text-primary`,
    text: tw`bg-transparent text-primary`,
  };

  // Button sizes
  const sizeStyles = {
    sm: tw`py-2 px-3 rounded-md`,
    md: tw`py-3 px-4 rounded-lg`,
    lg: tw`py-4 px-6 rounded-xl`,
  };

  // Text sizes
  const textSizes = {
    sm: tw`text-sm font-medium`,
    md: tw`text-base font-medium`,
    lg: tw`text-lg font-medium`,
  };

  // Combine styles
  const buttonStyles = [
    tw`flex-row items-center justify-center`,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? tw`w-full` : {},
    disabled ? tw`opacity-50` : {},
    style,
  ];

  const textStyles = [
    textSizes[size],
    variant === "outline"
      ? tw`text-primary`
      : variant === "text"
      ? tw`text-primary`
      : tw`text-white`,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "text"
              ? tw.color("primary")
              : tw.color("white")
          }
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
