// screens/HomeScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig.js";
import useFoodListRenderer from "../hooks/useFoodListRenderer";
import BottomBar from "../components/BottomBar";
import HistoryScreen from "./HistoryScreen";
import ProfileScreen from "./ProfileScreen";
import CartScreen from "./CartScreen";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { renderItem } = useFoodListRenderer(navigation);

  // Load data from Firebase
  useEffect(() => {
    const foodsRef = ref(db, "foods");
    const unsubscribeFoods = onValue(foodsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const items = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setFoods(items);
      } else setFoods([]);
    });

    const adRef = ref(db, "advertisements");
    const unsubscribeAds = onValue(adRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const items = Object.keys(data).map((key) => ({ id: key, image: data[key] }));
        setAds(items);
      } else setAds([]);
    });

    return () => {
      unsubscribeFoods();
      unsubscribeAds();
    };
  }, []);

  // Fade animation for ads
  useEffect(() => {
    if (ads.length > 1 && activeTab === "home") {
      const interval = setInterval(() => {
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();

        setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [ads, activeTab, fadeAnim]);

  // Search filter
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      setRecentSearches([]);
      return;
    }
    const matched = foods
      .filter((food) => food.name.toLowerCase().includes(text.toLowerCase()))
      .slice(0, 10);
    setRecentSearches(matched);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setRecentSearches([]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        {activeTab !== "profile" ? ( // ✅ Corrected conditional rendering
          <>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Your Fruits Adventure</Text>
          </>
        ) : (
          <Text style={styles.title}>👤 Profile</Text>
        )}
      </View>

      {/* Search bar below header */}
      {activeTab === "search" && (
        <View style={styles.searchWrapperBelow}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Search Fruits...."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearBtn}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Ads Carousel with Fade Animation */}
      {activeTab === "home" && ads.length > 0 && (
        <View style={styles.adWrapper}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Image
              source={{ uri: ads[currentIndex]?.image }}
              style={styles.adImage}
              resizeMode="stretch"
            />
          </Animated.View>

          {/* Dot Indicators */}
          <View style={styles.dotsContainer}>
            {ads.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
              />
            ))}
          </View>
        </View>
      )}

      {/* Fixed "Explore Your Fruits" text */}
      {(activeTab === "home" || activeTab === "search") && (
        <Text style={styles.listHeaderText}>Explore Your Fruits</Text>
      )}

      {/* Main Content */}
      {activeTab === "cart" ? (
        <CartScreen />
      ) : activeTab === "history" ? (
        <HistoryScreen recentSearches={recentSearches} />
      ) : activeTab === "profile" ? (
        <ProfileScreen />
      ) : (
        <FlatList
          data={activeTab === "search" ? filteredFoods : foods}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No foods available</Text>
          }
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
        />
      )}

      {/* Bottom navigation */}
      <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 28,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#2E7D32", marginTop: 25 },
  searchWrapperBelow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#A5D6A7",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
    paddingTop: 18,
    paddingBottom: 0,
    textAlignVertical: "top",
  },
  clearBtn: {
    backgroundColor: "#2E7D32",
    padding: 8,
    borderRadius: 50,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  adWrapper: {
    width: screenWidth - 40,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  adImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2E7D32",
    width: 10,
    height: 10,
  },
  listHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
    marginHorizontal: 20,
    marginTop: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777",
  },
});

export default HomeScreen;