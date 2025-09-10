// hooks/useFoodListRenderer.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function useFoodListRenderer(navigation) {
  const handleAddToCart = (item) => {
    navigation.navigate("CartDetails", { item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Image source={{ uri: item.image }} style={styles.foodImage} resizeMode="cover" />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Rs.{item.price}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return { renderItem };
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  itemInfo: { flexDirection: "row", alignItems: "center" },
  foodImage: { 
    width: 70, 
    height: 70, 
    marginRight: 15, 
    borderRadius: 35,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  textContainer: { 
    maxWidth: 180,
  },
  name: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: "#1E1E1E" 
  },
  price: { 
    fontSize: 15, 
    color: "#555", 
    marginTop: 3 
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 15 
  },
});
