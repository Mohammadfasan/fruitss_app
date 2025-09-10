import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";

export const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);

  // ✅ Sign Up
  const handleSignUp = async (name, address, phone, email, password, confirmPassword) => {
    // Trim inputs
    email = email.trim();
    password = password.trim();

    if (!name || !address || !phone || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra info to Realtime Database
      await set(ref(db, "users/" + user.uid), {
        uid: user.uid,
        name,
        address,
        phone,
        email,
        createdAt: new Date().toISOString(),
      });

      navigation.navigate("Home");
    } catch (error) {
      console.log("SignUp Error:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Sign In
  const handleSignIn = async (email, password) => {
    // Trim inputs
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user info from Realtime Database
      const userRef = ref(db, "users/" + user.uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        console.log("User Data:", snapshot.val());
      } else {
        console.log("No user data available");
      }

      navigation.navigate("Home");
    } catch (error) {
      console.log("SignIn Error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        alert("Invalid Email or Password");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, handleSignIn, loading };
};
