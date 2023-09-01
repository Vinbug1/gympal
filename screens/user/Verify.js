import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Verify = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const pinInputRefs = useRef([]);
  const pinLength = 4;

  const handlePinInput = (index, value) => {
    setPin((prevPin) => {
      const newPin = [...prevPin];
      newPin[index] = value;
      return newPin;
    });

    if (index < pinLength - 1 && value !== "") {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  const handleDelete = (index) => {
    if (index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }

    setPin((prevPin) => {
      const newPin = [...prevPin];
      newPin[index] = "";
      return newPin;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#CCFF00" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/shimg.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>You've got a mail</Text>
        <Text style={styles.description}>
          We have sent you an OTP verification code to your email address. Check your email and enter the code below.
        </Text>
        <View style={styles.pinContainer}>
          {Array.from({ length: pinLength }).map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (pinInputRefs.current[index] = ref)}
              style={[styles.pin, pin[index] && styles.filledPin]}
              value={pin[index]}
              onChangeText={(value) => handlePinInput(index, value)}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("PasswordScreen")}>
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    marginTop: 45,
  },
  backButton: {
    position: "absolute",
    top: 5,
    left: -125,
  },
  logo: {
    height: 45,
    width: 55,
    alignSelf: "center",
  },
  content: {
    backgroundColor: "#1D1D1B",
    flex: 1,
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 15,
    padding: 12,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    paddingLeft: 12,
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 35,
  },
  pin: {
    width: 65,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCFF00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  filledPin: {
    borderColor: "#CCFF00",
    color: "#CCFF00",
  },
  nextButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
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
});

export default Verify;
