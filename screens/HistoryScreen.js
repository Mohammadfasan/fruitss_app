// screens/HistoryScreen.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

export default function HistoryScreen({ recentSearches }) {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </View>
  );

  if (!recentSearches || recentSearches.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No recent searches yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  itemContainer: { flexDirection: "row", marginBottom: 15, alignItems: "center" },
  foodImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "gray" },
  emptyText: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 50 },
});
