import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleSignUp, loading } = useAuth(navigation);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        {/* Logo */}
        <Image
          source={require("../assets/logo.png")} // 🖼 Your logo path
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Join us and enjoy fresh fruits anytime 🍓</Text>

        {/* Input Fields */}
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
        <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={() => handleSignUp(name, address, phone, email, password, confirmPassword)}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={{ marginTop: 15 }}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={{ fontWeight: "bold", color: "#2E7D32" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f0ffd8",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: -10,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#2E7D32", 
    marginBottom: 5, 
    textAlign: "center" 
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
  },
  input: { 
    width: "90%",
    borderWidth: 1, 
    borderColor: "#A5D6A7", 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 12, 
    backgroundColor: "#fff",
    fontSize: 16
  },
  button: { 
    backgroundColor: "#2E7D32", 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: "center", 
    width: "50%" 
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 18 
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
});
