import React, { useRef, useState, useEffect,useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Feather } from "@expo/vector-icons";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from "mime";
import axios from "axios";
import Toast from "react-native-root-toast";

import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import baseUrl from "../../assets/common/baseUrl";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

const ITEMS_PER_PAGE = 1;
const GymLocation = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const [atEnd, setAtEnd] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedItems, setSelectedItems] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchUserDataFromDatabase = () => {
    // Replace this with your actual database fetching logic
    return [
      {
        id: 1,
        username: "John Doe",
        address: "1600 Amphitheatre Parkway, Mountain View, CA",
        latitude: 37.423423, // Replace with the actual latitude for the location
        longitude: -122.083953, // Replace with the actual longitude for the location
      },
      {
        id: 2,
        username: "Jane Smith",
        address: "221B Baker Street, London, UK",
        latitude: 51.523774, // Replace with the actual latitude for the location
        longitude: -0.15839, // Replace with the actual longitude for the location
      },
      {
        id: 3,
        username: "Michael Johnson",
        address: "Eiffel Tower, Paris, France",
        latitude: 48.858844, // Replace with the actual latitude for the location
        longitude: 2.294351, // Replace with the actual longitude for the location
      },
    ];
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt").then((tkn) => {
        axios({
          method: "GET",
          url: `${baseUrl}users`,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tkn,
          },
        })
          .then((res) => {
            setFriends(res.data);
            //console.log(friends.image);
          })
          .catch((error) => {
            Toast.show(error.message, Toast.LENGTH_SHORT);
          });

        // axios({
        //   method: "GET",
        //   url: `${baseUrl}users/`,
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + tkn,
        //   },
        // })
        //   .then((res) => {
        //     //setLoading(false);
        //     //setVendors(res.data);
        //   })
        //   .catch((error) => {
        //     Toast.show(error.message, Toast.LENGTH_SHORT);
        //   });
        return () => {
          setFriends([]);
         // setVendors([]);
          //setProductsFiltered([]);
        };
      });
    }, [])
  );
  useEffect(() => {
    // Fetch user data from the database
    const userData = fetchUserDataFromDatabase();
    setUsers(userData);

    // Get current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  const handleUserPress = (user) => {
    setSelectedUser(user);
    navigation.navigate("MapView", {
      currentLocation,
      selectedUser: user,
      handleBackNavigation,
    });
  };

  const handleFriendPress = (item) => {
    
  };

  const handleBackNavigation = () => {
    setSelectedUser(null); // Clear the selectedUser state when navigating back
    // navigation.goBack();
  };

  const renderCardItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleUserPress(item)}>
        <View style={styles.cardItem}>
          {/* <Image source={item.image} style={styles.cardImage} resizeMode="contain" /> */}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.username}</Text>
            <Text style={styles.cardDescription}>{item.address}</Text>
            <Text style={styles.cardDescription}>{item.latitude}</Text>
            <Text style={styles.cardDescription}>{item.longitude}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFriendCardItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Detail", { item: item })}>
        <View style={styles.cardItem}>
          <View style={styles.cardContent}>
            <View>
             <Image 
             resizeMode="cover"
             source={{ uri: item.image }}
             style={styles.cardImage} 
              />
            </View>
            <View style={{padding:12}}>
              <View style={{padding:6}}>
                <Text style={styles.cardTitle}>{item.name}</Text>
              </View>
              <View style={{padding:3}}>
              <Text style={styles.cardDescription}>{item.phoneNumber}</Text>
              </View>
              <View style={{padding:3}}>
                <Text style={styles.cardDescription}>{item.email}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

  const slides = [
    {
      id: 1,
      title: "Friends",
      customContent: (
        <>
          <FlatList
  data={friends}
  keyExtractor={(item, index) => index.toString()} // Use index as the key
  renderItem={renderFriendCardItem}
/>

        </>
      ),
    },
    {
      id: 2,
      title: "Gym",
      customContent: (
        <>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id.toString()} // Use toString() to avoid key error
            renderItem={renderCardItem}
          />
        </>
      ),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.slideViewsContainer}>
          <View style={styles.viewContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
            {/* <Text style={styles.itemDes}>{item.description}</Text> */}
            {item.customContent}
          </View>
        </View>
      </View>
    );
  };

  const handleSkipButton = () => {
    if (currentSlide === slides.length - 1) {
      console.log("Reached the end of slides");
    } else {
      carouselRef.current.snapToNext();
    }
  };

  const handleSnapToItem = (index) => {
    setCurrentSlide(index);
    if (index === slides.length - 1) {
      setAtEnd(true);
      clearInterval(autoScrollInterval);
    } else {
      setAtEnd(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 45 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#CCFF00" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/shimg.png")}
          resizeMode="contain"
          style={{ height: 45, width: 55, alignSelf: "center" }}
        />
      </View>
      <View style={{ backgroundColor: "#1D1D1B" }}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentSlide && styles.activeDot]}
            />
          ))}
        </View>
        <Carousel
          ref={carouselRef}
          data={slides}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          layout="default"
          loop
          autoplay={false} // Set this to false
          enableMomentum
          lockScrollWhileSnapping
          inactiveSlideOpacity={0.7}
          inactiveSlideScale={0.9}
          carouselMode={ITEMS_PER_PAGE}
          onSnapToItem={handleSnapToItem}
          containerCustomStyle={styles.carouselContainer}
        />

        {/* <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentSlide && styles.activeDot]}
            />
          ))}
        </View> */}
        {atEnd ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleSkipButton}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleSkipButton}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1B141F",
  },
  slideContainer: {
    position: "absolute",
    top: 25,
    alignSelf: "center",
  },
  slideViewsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    // height: "100%",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    //alignSelf: "center",
      margin: 10,
  },
  itemDes: {
    flex: 1,
    overflow: "hidden",
  },
  pagination: {
    position: "absolute",
    top: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dot: {
    width: 90,
    height: 4,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 65,
  },
  activeDot: {
    backgroundColor: "#CCFF00",
  },
  skipButton: {
    position: "absolute",
    bottom: 90,
    padding: 10,
    borderRadius: 5,
  },
  nextButton: {
    width: "85%",
    height: 50,
    alignSelf: "center",
    position: "absolute",
    bottom: 102,
    backgroundColor: "#CCFF00",
    padding: 5,
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 19,
    color: "#1D1D1B",
    fontWeight: "bold",
    alignSelf: "center",
    padding: 6,
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: -125,
  },

  
  locationContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // Adjust this value based on your layout
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  cardItem: {
    flexDirection: "row",
    width: "100%",
    height:105,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#FFFFFF",
    borderRadius: 5,
   // overflow: "hidden",
    alignSelf: "center",
  },
  cardImage: {
    width: 85,
    height: 85,
    //alignSelf: "center",
    borderColor:"#CCFF00",
    borderWidth:0.5,
    borderRadius: 10,
    margin: 2,
  },
  cardContent: {
    width: "95%",
    height: "100%",
    padding: 9,
    flexDirection:"row"
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#CCFF00",
  },
  cardDescription: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});

export default GymLocation;

