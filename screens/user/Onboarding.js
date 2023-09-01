import React, { useRef, useState } from "react";
import { View, Text, Dimensions, StyleSheet,  ImageBackground, TouchableOpacity, Platform } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;
const ITEMS_PER_PAGE = 1;

const data = [
  {
    id: 1,
    title: "Do something today",
    image: require("../../assets/spaimgzr.png"),
    description: "if you change the way look at things, the things you look at changes ",
  },
  {
    id: 2,
    title: "Payment Of Utility Bills",
    image: require("../../assets/spaimgsd.png"),
    description: "With just a click, you can pay all your utility bills",
  },
  {
    id: 3,
    title: "Wastemonie Store",
    image: require("../../assets/spaimgon.png"),
    description: "Wastemonie rewards users with cash to exchange their waste",
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const [atEnd, setAtEnd] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderItem = ({ item }) => {
    return (
        <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemDes}>{item.description}</Text>
      </View>
    );
  };

  const handleSkipButton = () => {
    if (currentSlide === data.length - 1) {
      // Handle action when it gets to the end
      console.log("Reached the end of slides");
    } else {
      carouselRef.current.snapToNext();
    }
  };

  const handleSnapToItem = (index) => {
    setCurrentSlide(index);
    if (index === data.length - 1) {
      setAtEnd(true);
      clearInterval(autoScrollInterval);
    } else {
      setAtEnd(false);
    }
  };
  const handle = () => {
    navigation.navigate("WelcomeScreen")
  };

  return (
    <View style={styles.container}>
         <ImageBackground
        source={data[currentSlide].image}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity onPress={() => handle()}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
          layout="default"
          loop
          autoplay={false}
          enableMomentum
          lockScrollWhileSnapping
          inactiveSlideOpacity={0.7}
          inactiveSlideScale={0.9}
          carouselMode={ITEMS_PER_PAGE}
          onSnapToItem={handleSnapToItem}
          containerCustomStyle={styles.carouselContainer}
        />
      </ImageBackground>


      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View key={index} style={[styles.dot, index === currentSlide && styles.activeDot]} />
        ))}
      </View>

      {atEnd ? (
        <TouchableOpacity style={styles.nextButton} onPress={() => handle()}>
          <Text style={styles.nextButtonText}>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipButton}>
        {/* {currentSlide === data.length - 1 ? (
            <Text style={styles.skipButtonText}>Skip</Text>
            ) : ( */}
                <View style={styles.circularBorder}>
                <Feather name="arrow-right" size={28} color="#1D1D1B" />
              </View>
            {/* )} */}
      </TouchableOpacity>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
      },
      backgroundImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",
      },   
      textContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
      },
    textContainer:{
        position: "absolute",
        bottom: "26%",
        justifyContent: "center",
        alignSelf: "center",
    },

  image: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  itemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
    marginTop:45
    //margin:16
  },
  itemDes: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#FFFFFF",
    alignSelf: "center",
    padding:12
  },
  itemTextDescrip: {
    fontSize: 12,
    fontWeight: "normal",
    marginTop: 10,
  },
  carouselContainer: {
    flex: 1,
    overflow: "hidden",
  },
  pagination: {
    position: "absolute",
    bottom: 140,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dot: {
    width: 85,
    height: 4,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 19,
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
    width: "40%",
    height: 50,
    position: "absolute",
    bottom: 60,
    backgroundColor: "#CCFF00",
    padding: 10,
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 15,
    color: "#1D1D1B",
    fontWeight: "normal",
    alignSelf: "center",
    padding: 6,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    position: "absolute",
    top: 55,
    right: -170,
  },
  circularBorder: {
    height:Platform.OS === 'ios' ? 40 : 58,
    width:Platform.OS === 'ios' ? 40 : 58,
    borderRadius: Platform.OS === 'ios' ? 20: 30, // Half of the height or width to create a circular border
    //borderWidth: 1,
    //borderColor: "#CCFF00",
    backgroundColor: "#CCFF00",
    alignItems: "center",
    justifyContent: "center",
    position:"absolute",
    right: -130,
  },

});

export default Onboarding;


