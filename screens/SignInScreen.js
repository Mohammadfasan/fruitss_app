import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignIn, loading } = useAuth(navigation);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/logo.png')} // 🖼 your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title & Subtitle */}
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to continue your healthy journey</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
        placeholderTextColor="#888"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#888"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={() => handleSignIn(email, password)} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.registerText}>
          Don't have an account? <Text style={{ fontWeight: 'bold', color: '#2E7D32' }}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0ffd8', 
    paddingHorizontal: 20 
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: -15,
    marginTop: -85
  },
  title: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#2E7D32', 
    marginBottom: 8 
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 15,
    fontSize: 16,
  },
  button: { 
    backgroundColor: '#2E7D32', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    width: '50%' 
  },
  buttonText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  registerText: {
    fontSize: 14,
    color: '#555',
  },
});
