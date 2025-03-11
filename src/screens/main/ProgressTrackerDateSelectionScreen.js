import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "../../utils/tw";
import Container from "../../components/Container";
import Header from "../../components/Header";

const ProgressTrackerDateSelectionScreen = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Generate mock data for the selected month
  const generateMockData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const today = new Date();

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(selectedYear, selectedMonth, day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === selectedMonth &&
        today.getFullYear() === selectedYear;
      const isPast = date < today;

      // Generate random data for past days
      let hasData = false;
      let caloriesConsumed = 0;
      let caloriesBurned = 0;

      if (isPast) {
        hasData = Math.random() > 0.3; // 70% chance of having data
        if (hasData) {
          caloriesConsumed = Math.floor(Math.random() * 1000) + 1000;
          caloriesBurned = Math.floor(Math.random() * 500) + 100;
        }
      }

      return {
        day,
        date,
        isToday,
        isPast,
        hasData,
        caloriesConsumed,
        caloriesBurned,
      };
    });
  };

  const data = generateMockData();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleDayPress = (item) => {
    if (item.isPast || item.isToday) {
      navigation.navigate("ProgressTrackerDailyLogView", {
        date: item.date.toISOString(),
        hasData: item.hasData,
        caloriesConsumed: item.caloriesConsumed,
        caloriesBurned: item.caloriesBurned,
      });
    }
  };

  const renderDay = ({ item }) => {
    const dayStyles = [styles.dayItem];
    const dayTextStyles = [styles.dayText];

    if (item.isToday) {
      dayStyles.push(styles.todayItem);
      dayTextStyles.push(styles.todayText);
    } else if (!item.isPast) {
      dayStyles.push(styles.futureItem);
      dayTextStyles.push(styles.futureText);
    }

    return (
      <TouchableOpacity
        style={dayStyles}
        onPress={() => handleDayPress(item)}
        disabled={!item.isPast && !item.isToday}
      >
        <Text style={dayTextStyles}>{item.day}</Text>
        {item.hasData && (
          <View style={styles.dataIndicator}>
            <View style={styles.dataIndicatorDot} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <Header
        title="Progress Tracker"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={tw`px-6 py-4`}>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Ionicons name="chevron-back" size={24} color="#3B82F6" />
          </TouchableOpacity>

          <Text style={styles.monthYearText}>
            {monthNames[selectedMonth]} {selectedYear}
          </Text>

          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="chevron-forward" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <View style={styles.weekdaysHeader}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <Text key={index} style={styles.weekdayText}>
                {day}
              </Text>
            )
          )}
        </View>

        <FlatList
          data={data}
          renderItem={renderDay}
          keyExtractor={(item) => item.day.toString()}
          numColumns={7}
          scrollEnabled={false}
        />

        <View style={styles.legendContainer}>
          <View style={tw`flex-row items-center`}>
            <View style={[styles.legendDot, { backgroundColor: "#3B82F6" }]} />
            <Text style={tw`ml-2`}>Today</Text>
          </View>

          <View style={tw`flex-row items-center ml-4`}>
            <View style={[styles.legendDot, { backgroundColor: "#10B981" }]} />
            <Text style={tw`ml-2`}>Has Data</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekdaysHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekdayText: {
    width: 40,
    textAlign: "center",
    fontWeight: "500",
    color: "#6B7280",
  },
  dayItem: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  todayItem: {
    backgroundColor: "#3B82F6",
  },
  futureItem: {
    backgroundColor: "#F3F4F6",
  },
  dayText: {
    fontWeight: "500",
  },
  todayText: {
    color: "#fff",
  },
  futureText: {
    color: "#9CA3AF",
  },
  dataIndicator: {
    position: "absolute",
    bottom: 4,
    alignItems: "center",
  },
  dataIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default ProgressTrackerDateSelectionScreen;
