// screens/ProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebaseConfig";
import { ref, onValue, set } from "firebase/database";

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, "users/" + user.uid);
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUser(userData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSave = async () => {
    if (user.name && user.email && user.phone && user.address) {
      setLoading(true);
      const userRef = ref(db, "users/" + auth.currentUser.uid);
      try {
        await set(userRef, user);
        setEditable(false);
        alert("Profile saved successfully!");
      } catch (error) {
        console.error("Error saving profile:", error);
        alert("Failed to save profile. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill all fields before saving.");
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0a0b0aff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Icon */}
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={100} color="#0a0b0aff" />
      </View>

      {/* Title */}
      <Text style={styles.title}>My Profile</Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={[styles.input, !editable && styles.readOnlyInput]}
          placeholder="Enter your name"
          value={user.name}
          editable={editable}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>

      {/* Phone */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={[styles.input, !editable && styles.readOnlyInput]}
          placeholder="Enter your phone"
          value={user.phone}
          editable={editable}
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="phone-pad"
        />
      </View>

      {/* Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, !editable && styles.readOnlyInput]}
          placeholder="Enter your address"
          value={user.address}
          editable={editable}
          onChangeText={(text) => handleChange("address", text)}
          multiline
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {editable ? (
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>💾 Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>✏️ Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: "#4CAF50",
    alignSelf: "center",
    paddingBottom: 5,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  readOnlyInput: {
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    elevation: 3,
  },
  editButton: {
    backgroundColor: "#2196F3",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
