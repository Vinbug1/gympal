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
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../utils/Input";

const ForgotPassWord = () => {
    const navigation = useNavigation();
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

//   const handleSubmit = async () => {
//     try {
//       const user = { email, password };
//       if (email === "" || password === "") {
//         setError("Please fill in your credentials");
//       } else {
//         const response = await fetch(`${baseUrl}users/login`, {
//           method: "POST",
//           body: JSON.stringify(user),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           AsyncStorage.setItem("userString", JSON.stringify(data));
//           navigation.navigate("MainScreen");
//         } else {
//           Toast.show("Please provide correct credentials",Toast.LENGTH_SHORT);
//         }
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

  const forgot = () => {
    navigation.navigate("VerifyScreen");
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >

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
    <View style={{ backgroundColor: "#1D1D1B",flex:1,width:"100%" }}>
      <View>
        <Text style={{fontSize:26,color:"#FFFFFF",fontWeight:"bold",marginTop:15,padding:12}}>Forget Password</Text>
        <Text style={{fontSize:16,color:"#FFFFFF",paddingLeft:12}}>
          Enter your email address we would send you opt code for verification in the next phase 
        </Text>
      </View>
      <View style={{alignSelf:"center",width:"90%",marginTop:120}}>
        <View style={styles.inputContainer}>
          {/* <Text style={styles.inputLabel}>Email</Text> */}
          <Input
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
  
        
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={() => forgot()}>
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
      
    </View>
  </View>
  </KeyboardAvoidingView>
  )
}

export default ForgotPassWord

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#1B141F",
    },
    slideContainer: {
      position: "absolute",
      top: 33,
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
      fontSize: 15,
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
      top: 20,
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
      height: 50,
      alignSelf: "center",
      position: "absolute",
      bottom: 160,
      backgroundColor: "#CCFF00",
      padding: 10,
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
      elevation: 10,
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
      paddingVertical: 10,  // Add top and bottom padding for spacing
    },
  });