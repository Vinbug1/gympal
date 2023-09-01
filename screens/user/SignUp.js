import React, { useRef, useState } from "react";
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
  KeyboardAvoidingView
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CheckboxTextInput from "../utils/CheckboxTextInput";
import CheckItems from "../utils/CheckItems";
import Input from "../utils/Input";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import axios from "axios";
import Toast from "react-native-root-toast";


import { FontAwesome } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SCREEN_WIDTH * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

const ITEMS_PER_PAGE = 1;
const SignUp = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const [atEnd, setAtEnd] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItem, setSelectedItem] = useState(""); // State to track selected value
  const [selectedItems, setSelectedItems] = useState("");
  const [selectedReason, setSelectedReason] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [mainImage, setMainImage] = useState();
  const [email, setEmail] = useState(""); // State to track selected value
  const [country, setCountry] = useState(""); // State to track selected value
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const inputFields = [
    "14 - 17",
    "18 - 24",
    "25 - 29",
    "30 - 34",
    "35 - 39",
    "40 - 44",
    "45 - 49",
    " >  49",
  ];

  const data = [
    "Stress Reduction",
    "Improved Focus & Concentration",
    "Improveself-awareness",
    "Socialized",
    "Get Update on my fitness track",
    "Spirituality",
    "Greater Sense of well-being",
  ];
  const countries = [
    { name: "User", value: "user" },
    { name: "Agent", value: "agent" },
    { name: "Business", value: "business" },
  ];

  
  const register = () => {
    let userData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");
    userData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    userData.append("name", name);
    userData.append("email", email);
    userData.append("phoneNumber", phoneNumber);
    userData.append("password", password);
    userData.append("country", country);
    userData.append("selectedItem", selectedItem);
    userData.append("selectedItems", selectedItems);
    userData.append("selectedReason", selectedReason);
     console.log("checking the data",userData);
    axios
      .post(`${baseUrl}users/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Toast.show(
            "enter sent token to complete registration",
            Toast.LENGTH_SHORT
          );
          navigation.navigate("SignIn");
        }
      })
      .catch((error) => {
        if (error.response) {
          Toast.show(error.message, Toast.LENGTH_SHORT);
        } else if (error.request) {
          Toast.show("No response from the server", Toast.LENGTH_SHORT);
        } else {
          Toast.show("Error in request setup", Toast.LENGTH_SHORT);
        }
      });
  };

  const handleRadioBtnClick = (label) => {
    setSelectedItem(label);
    //console.log(selectedItem);
  };

  const handleBtnClick = (item) => {
    if (selectedReason.includes(item)) {
      setSelectedReason(selectedReason.filter((selected) => selected !== item));
    } else {
      setSelectedReason([...selectedReason, item]);
      console.log(selectedReason);
    }
  };

  const handleItemSelect = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selected) => selected !== item));
    } else {
      setSelectedItems(item);
      //console.log(item);
    }
  };

  const renderIte = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedItems.includes(item) && styles.selectedItem]}
      onPress={() => handleItemSelect(item)}
    >
      <Text
        style={[
          styles.itemTex,
          selectedItems.includes(item) && styles.selectedItemText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const sendSelectedItemsToDatabase = () => {
    // Simulate sending selected items to a database
    //console.log('Sending selected items:', selectedItems);
    // Clear the selected items
    setSelectedItems();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const renderRole = (countries) => {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.textItem}>{countries.name}</Text>
      </View>
    );
  };

  const slides = [
    {
      id: 1,
      title: "What is your gender? ",
      description: "Select your geneder for better fitness content",
      customContent: (
        <>
          <CheckboxTextInput
            label="I am Male"
            isSelected={selectedItem === "I am Male"}
            onRadioBtnClick={() => handleRadioBtnClick("I am Male")}
          />
          <CheckboxTextInput
            label="I am Female"
            isSelected={selectedItem === "I am Female"}
            onRadioBtnClick={() => handleRadioBtnClick("I am Female")}
          />
          <CheckboxTextInput
            label="I am transgender(Male)"
            isSelected={selectedItem === "I am transgender(Male)"}
            onRadioBtnClick={() =>
              handleRadioBtnClick("I am transgender(Male)")
            }
          />
          <CheckboxTextInput
            label="I am transgender(Female)"
            isSelected={selectedItem === "I am transgender(Female)"}
            onRadioBtnClick={() =>
              handleRadioBtnClick("I am transgender(Female)")
            }
          />
          <CheckboxTextInput
            label="Other"
            isSelected={selectedItem === "Other"}
            onRadioBtnClick={() => handleRadioBtnClick("Other")}
          />
        </>
      ),
    },
    {
      id: 2,
      title: "Choose your Age",
      description: "Select your age for better fitness content",
      customContent: (
        <View style={styles.agcontainer}>
          <FlatList
            data={inputFields}
            renderItem={renderIte}
            keyExtractor={(item) => item}
            numColumns={2}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendSelectedItemsToDatabase}
            >
              {/* <Text>Send to Database</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      id: 3,
      title: "What is you goal of using this app",
      description:
        "Select the goals you want to archive with the gym-pal app to get better recommendation",
      customContent: (
        <View style={{ width: "90%", alignSelf: "center", margin: 9 }}>
          <ScrollView>
            {data.map((item) => (
              <CheckItems
                key={item}
                label={item}
                isSelected={selectedItems.includes(item)}
                onBtnClick={() => handleBtnClick(item)}
              />
            ))}
          </ScrollView>
        </View>
      ),
    },
    {
      id: 4,
      title: "Create an Account",
      description:
        "Enter your email & password. if you forget ot then you have to do forget password",
      customContent: (
        <View style={{ marginTop: 20, width: "95%" }}>
          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputLabel}>Email</Text> */}
            <Input
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Text style={styles.inputLabel}>Password</Text> */}
            <Input
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
            {/* <Input
              placeholder="ConfirmPassword"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={true}
            /> */}
          </View>
          {/* </KeyboardAvoidingView> */}
        </View>
      ),
    },
    {
      id: 5,
      title: "Complete your Profile",
      description:
        "Dont worry, only you can see your personal data. No one sle will be able to see it.",
      customContent: (
        <>
          <KeyboardAvoidingView
    style={{ height: '100%', width: '100%' }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -5}
  >
    <ScrollView  style={{margin:-18, padding:12}}>
          <View style={styles.imageContainer}>
            <Image style={styles.imagejv} source={{ uri: mainImage }} />
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              <FontAwesome name="camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20, width: "100%" }}>
            <Input
              placeholder="FullName"
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <Input
              placeholder="Phone"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />

            <Dropdown
              style={styles.dropdown}
              data={countries}
              labelField="name"
              valueField="name"
              value={countries}
              search
              placeholder="Select Country"
              searchPlaceholder="Search..."
              onChange={(roles) => {
                setCountry(roles.value);
              }}
              renderItem={renderRole}
              />
          </View>
              </ScrollView>
          </KeyboardAvoidingView>
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
            <Text style={styles.itemDes}>{item.description}</Text>
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

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentSlide && styles.activeDot]}
            />
          ))}
        </View>
        {atEnd ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => register()}
          >
            <Text style={styles.nextButtonText}>Submit</Text>
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
    top: 63,
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
    alignSelf: "center",
    marginTop: 10,
  },
  itemDes: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#FFFFFF",
    alignSelf: "center",
    padding: 12,
  },
  customContentView: {
    backgroundColor: "#CCFF00",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  carouselContainer: {
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
    width: 45,
    height: 4,
    borderRadius: 5,
    backgroundColor: "gray",
    marginHorizontal: 6,
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
    width: "90%",
    height: 60,
    alignSelf: "center",
    position: "absolute",
    bottom: 135,
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
  circularBorder: {
    height: Platform.OS === "ios" ? 40 : 58,
    width: Platform.OS === "ios" ? 40 : 58,
    borderRadius: Platform.OS === "ios" ? 20 : 30,
    backgroundColor: "#CCFF00",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -130,
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: -125,
  },

  agcontainer: {
    flex: 1,
    paddingTop: 50,
    width: "100%",
    height: "100%",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "60%",
    height: 52,
    margin: 15,
  },
  selectedItem: {
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  sendButton: {
    // backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 55,
    borderRadius: 5,
  },
  itemTex: {
    color: "#FFFFFF", // Default text color
  },
  selectedItemText: {
    color: "black", // Text color when selected
  },
  imageContainer: {
    width: 115,
    height: 118,
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#CCFF00",
    elevation: 5,
    alignSelf: "center",
  },
  imagePicker: {
    position: "absolute",
    right: -25,
    bottom: 5,
    backgroundColor: "#CCFF00",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
    borderColor: "#CCFF00",
  },
  dropdown: {
    width: "100%",
    height: 48,
    backgroundColor: "white",
    margin: 6,
    borderRadius: 5,
    padding: 5,
    alignSelf: "center",
    borderColor: "#039C03",
    borderWidth: 0.5,
  },
  imagejv: {
    width: 120,
    height: 120,
    borderRadius: 75,
    alignSelf: "center",
  },
  dropdownItem: {
    paddingHorizontal: 16, // Add left and right padding for spacing
    paddingVertical: 10, // Add top and bottom padding for spacing
  },
});

export default SignUp;
