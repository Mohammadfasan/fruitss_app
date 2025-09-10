// SplashScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} // unga image path
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.title}>
        <Text style={{color: 'orange'}}>FRESH</Text> BITE
      </Text>

    

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')} // sign in screen ku navigate pannu
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
        {/* Description */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ffd8',  // light green background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: -50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#15531dff',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});