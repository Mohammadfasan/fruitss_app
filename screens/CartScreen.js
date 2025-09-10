// screens/CartScreen.js
import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CartScreen() {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleProceed = () => {
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity / 100), // price per 100g
      0
    );
    navigation.navigate("CheckoutScreen", { totalAmount, cartItems });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => {
              const newQty = item.quantity - 100;
              newQty > 0 ? updateQuantity(item.id, newQty) : removeFromCart(item.id);
            }}
          >
            <Ionicons name="remove-outline" size={16} color="#4CAF50" />
          </TouchableOpacity>

          <Text style={styles.itemQuantity}>
            {item.quantity >= 1000
              ? `${item.quantity / 1000} kg`
              : `${item.quantity}g`}
          </Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => updateQuantity(item.id, item.quantity + 100)}
          >
            <Ionicons name="add-outline" size={16} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
            <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f0f4f7",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#34495e",
  },
  removeButton: {
    marginLeft: "auto",
    padding: 8,
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#7f8c8d",
  },
});
