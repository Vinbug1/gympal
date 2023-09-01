import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Platform
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Input from "../utils/Input";
import Toast from "react-native-root-toast";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const user = { email, password };
      if (email === "" || password === "") {
        setError("Please fill in your credentials");
      } else {
        const response = await fetch(`${baseUrl}users/login`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("testing",data);
          AsyncStorage.setItem("userString", JSON.stringify(data));
          navigation.navigate("MainScreen");
        } else {
          Toast.show("Please provide correct credentials",Toast.LENGTH_SHORT);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const forgot = () => {
    navigation.navigate("ForgotScreen");
  }

  // const fogot = () => {
  //   navigation.navigate("MainScreen");
  // }

  return (
  //   <KeyboardAvoidingView
  //   //style={{ flex: 1 }}
  //   behavior={Platform.OS === "ios" ? "padding" : "height"}
  //   keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 2}
  // >
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
          <Text style={{fontSize:26,color:"#FFFFFF",fontWeight:"bold",marginTop:15,padding:12}}>Hey Dear</Text>
          <Text style={{fontSize:16,color:"#FFFFFF",paddingLeft:12}}>
            Please enter your email and password to Sign-In
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} vertical >

        <View style={{alignSelf:"center",width:"90%",marginTop:80}}>
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
          </View>
        </View>
        <View>
          <TouchableOpacity  onPress={() => forgot()} style={{alignSelf:"center",}}>
              <Text style={{fontSize:16,color:"#FFFFFF",paddingLeft:12}}>
                Forgot password
              </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <TouchableOpacity style={styles.nextButton} onPress={() => handleSubmit()}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1B141F",
  },
  
  nextButton: {
    width: "90%",
    height: 60,
    alignSelf: "center",
    position: "absolute",
    bottom:Platform.OS === 'ios'  ? 45 : 9,
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
 
  backButton: {
    position: "absolute",
    top: 5,
    left: -125,
  },

  
});

export default SignIn;
