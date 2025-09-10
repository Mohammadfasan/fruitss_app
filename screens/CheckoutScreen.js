// screens/CheckoutScreen.js
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from "../firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";

export default function CheckoutScreen({ route, navigation }) {
  const { totalAmount, cartItems = [] } = route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, "users/" + user.uid);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setName(userData.name || "");
          setAddress(userData.address || "");
          setPhone(userData.phone || "");
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to place an order.");
      return;
    }
    
    try {
      const sriLankaTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Colombo",
      });

      const ordersRef = ref(db, `users/${user.uid}/orders`);
      const newOrderRef = push(ordersRef);
      const orderData = {
        name,
        address,
        phone,
        cartItems, 
        totalAmount,
        paymentMethod,
        timestamp: sriLankaTime,
      };
      await set(newOrderRef, orderData);

      const paymentsRef = ref(db, 'payments');
      const newPaymentRef = push(paymentsRef);
      await set(newPaymentRef, {
        name,
        address,
        tellNo: phone, 
        price: totalAmount, 
        cartItems, 
        timestamp: sriLankaTime,
      });

      Alert.alert(
        "✅ Order Success",
        "Your order has been placed successfully!",
        [
          { text: "🏠 Go to Home", onPress: () => navigation.navigate("Home") },
        ]
      );

    } catch (error) {
      console.error("Error placing order: ", error);
      Alert.alert("Error", "There was an issue placing your order. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Delivery Details */}
        <Text style={styles.sectionTitle}>Delivery Details</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Ionicons name="person-circle-outline" size={20} color="#666" style={styles.icon} />
            <Text style={styles.detailText}>{String(name)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <Text style={styles.detailText}>{String(address)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
            <Text style={styles.detailText}>{String(phone)}</Text>
          </View>
        </View>

        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.card}>
          {cartItems.map((item, index) => {
            const displayQuantity =
              item.quantity >= 1000 ? `${item.quantity / 1000} kg` : `${item.quantity}g`;
            const itemTotal = item.price * (item.quantity / 100);

            return (
              <View key={String(item.id || index)} style={styles.orderItem}>
                <Text style={styles.itemName}>{String(item.name)}</Text>
                <Text style={styles.itemDetails}>
                  Rs.{item.price} / 100g × {displayQuantity}
                </Text>
                <Text style={styles.itemTotalPrice}>
                  = Rs.{itemTotal.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentButton,
              paymentMethod === "Cash" && styles.selectedPayment,
            ]}
            onPress={() => setPaymentMethod("Cash")}
          >
            <Ionicons 
              name="cash-outline" 
              size={24} 
              color={paymentMethod === "Cash" ? "#4CAF50" : "#666"} 
            />
            <Text style={[
              styles.paymentText, 
              paymentMethod === "Cash" && styles.selectedPaymentText
            ]}>
              Cash on Delivery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Amount */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalAmount}>Rs.{String(totalAmount)}</Text>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
        <Text style={styles.orderButtonText}>Place My Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row", alignItems: "center",
    paddingTop: 50, paddingBottom: 15, paddingHorizontal: 16,
    backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#eee",
    marginBottom: 10,
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#2E7D32" },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15, marginBottom: 10 },
  card: {
    backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 15,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
  },
  detailRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  icon: { marginRight: 10 },
  detailText: { fontSize: 16, color: "#555" },
  orderItem: {
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f0f0f0",
  },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  itemDetails: { fontSize: 14, color: "#777" },
  itemTotalPrice: { fontSize: 16, fontWeight: "bold", color: "#4CAF50", marginTop: 5 },
  paymentMethods: { flexDirection: "row", marginBottom: 20 },
  paymentButton: {
    flex: 1, flexDirection: "row", alignItems: "center",
    padding: 15, backgroundColor: "#f0f4f7",
    borderRadius: 12, borderWidth: 2, borderColor: "transparent",
  },
  selectedPayment: { borderColor: "#4CAF50", backgroundColor: "#e8f5e9" },
  paymentText: { fontSize: 16, fontWeight: "bold", marginLeft: 10, color: "#666" },
  selectedPaymentText: { color: "#4CAF50" },
  totalContainer: {
    flexDirection: "row", justifyContent: "space-between",
    paddingVertical: 15, borderTopWidth: 2, borderTopColor: "#eee", marginTop: 10,
  },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  totalAmount: { fontSize: 20, fontWeight: "bold", color: "#4CAF50" },
  orderButton: {
    position: "absolute", bottom: 20, left: 16, right: 16,
    backgroundColor: "#4CAF50", padding: 18, borderRadius: 12,
    alignItems: "center", elevation: 6,
  },
  orderButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
