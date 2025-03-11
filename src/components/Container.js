import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import tw from "../utils/tw";

const Container = ({
  children,
  scrollable = true,
  style = {},
  contentContainerStyle = {},
  safeArea = true,
  statusBarColor = "light", // 'light' or 'dark'
}) => {
  const containerStyle = [tw`flex-1 bg-white`, style];

  const content = scrollable ? (
    <ScrollView
      style={tw`flex-1`}
      contentContainerStyle={[tw`p-4`, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[tw`flex-1 p-4`, contentContainerStyle]}>{children}</View>
  );

  if (safeArea) {
    return (
      <SafeAreaView style={containerStyle}>
        <StatusBar
          barStyle={
            statusBarColor === "light" ? "light-content" : "dark-content"
          }
        />
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View style={containerStyle}>
      <StatusBar
        barStyle={statusBarColor === "light" ? "light-content" : "dark-content"}
      />
      {content}
    </View>
  );
};

export default Container;
