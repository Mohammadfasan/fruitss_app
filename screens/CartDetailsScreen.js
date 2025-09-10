import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get("window"); // Get device width

export default function CartDetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);

    Toast.show({
      type: 'success',
      text1: "🛒 Added to Cart!",
      text2: `${item.name} has been added.`,
      position: 'bottom',
      visibilityTime: 2000,
      autoHide: true,
      bottomOffset: 250,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>{item.name}</Text>
      </View>

      {/* Food Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="stretch" // Stretch image fully
        />
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>Price: {item.price}</Text>
        <Text style={styles.description}>
          {item.description || "Price of 100g"}
        </Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  imageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 450,   // Full device width
    height: 250,    // You can adjust height
    borderRadius:20, // No rounded corners for full stretch
    shadowColor: "#2E7D32",
    shadowOpacity: 0.4,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  price: {
    fontSize: 18,
    color: "#2E7D32",
    marginBottom: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2E7D32",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
