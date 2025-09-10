import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function BottomBar({ activeTab, setActiveTab }) {
  const handlePress = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.bottomBar}>
      {/* Home Tab */}
      <TouchableOpacity style={styles.iconButton} onPress={() => handlePress("home")}>
        <Icon name="home" size={28} color={activeTab === "home" ? "#4CAF50" : "#333"} />
        <Text style={[styles.iconText, activeTab === "home" && { color: "#4CAF50" }]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Search Tab */}
      <TouchableOpacity style={styles.iconButton} onPress={() => handlePress("search")}>
        <Icon name="search" size={28} color={activeTab === "search" ? "#4CAF50" : "#333"} />
        <Text style={[styles.iconText, activeTab === "search" && { color: "#4CAF50" }]}>
          Search
        </Text>
      </TouchableOpacity>

      {/* History Tab */}
      <TouchableOpacity style={styles.iconButton} onPress={() => handlePress("history")}>
        <Icon name="history" size={28} color={activeTab === "history" ? "#4CAF50" : "#333"} />
        <Text style={[styles.iconText, activeTab === "history" && { color: "#4CAF50" }]}>
          History
        </Text>
      </TouchableOpacity>

      {/* Cart Tab */}
      <TouchableOpacity style={styles.iconButton} onPress={() => handlePress("cart")}>
        <Icon
          name="shopping-cart"
          size={28}
          color={activeTab === "cart" ? "#4CAF50" : "#333"}
        />
        <Text style={[styles.iconText, activeTab === "cart" && { color: "#4CAF50" }]}>
          Cart
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity style={styles.iconButton} onPress={() => handlePress("profile")}>
        <Icon name="person" size={28} color={activeTab === "profile" ? "#4CAF50" : "#333"} />
        <Text style={[styles.iconText, activeTab === "profile" && { color: "#4CAF50" }]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
  },
});
