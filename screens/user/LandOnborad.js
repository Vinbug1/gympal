import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";


const LandOnboard = () => {
  const [isButton1Green, setIsButton1Green] = useState(false);
  const [isButton2Green, setIsButton2Green] = useState(false);
  const navigation = useNavigation();

  const handleButton1Click = () => {
    setIsButton1Green(true);
    setIsButton2Green(false);
    navigation.navigate("SignUp");
  };

  const handleButton2Click = () => {
    setIsButton1Green(false);
    setIsButton2Green(true);
    navigation.navigate("SignIn");

  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/welcome.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Image
          source={require("../../assets/shimg.png")}
          resizeMode="contain"
          style={styles.img}
        />

          <View style={{ position:"absolute", bottom:235 }}>
            <Text style={styles.itemText}>Welcome to Gym-Pal</Text>
            <Text style={styles.itemDes}>
              If you change the way you look at things, the things you look at
              changes
            </Text>
          </View>
        <View style={{position:"absolute",bottom:48 }}>
          <View style={{ alignSelf: "center" }}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isButton1Green ? "#CCFF00" : "transparent" },
              ]}
              onPress={handleButton1Click}
            >
              <Text>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isButton2Green ? "#CCFF00" : "transparent" },
              ]}
              onPress={handleButton2Click}
            >
              <Text>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
  img: {
    height: 98,
    width: "75%",
    alignSelf: "center",
    padding: 12,
    marginTop: 90,
  },
  itemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "center",
    marginTop: 85,
  },
  itemDes: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#FFFFFF",
    alignSelf: "center",
    padding: 12,
  },
  button: {
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCFF00",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default LandOnboard;





