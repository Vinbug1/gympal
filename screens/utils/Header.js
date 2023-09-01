import { StyleSheet, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import {
    Feather,
    MaterialCommunityIcons,
    FontAwesome,
    MaterialIcons,
  } from "@expo/vector-icons";
const Header = () => {
  return (
    <View style={{ flexDirection: "row", marginTop: 45,    backgroundColor: "#1B141F", alignSelf:"center" }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#CCFF00"
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/shimg.png")}
          resizeMode="contain"
          style={{ height: 45, width: 55, alignSelf: "center" }}
        />
        <TouchableOpacity
          style={styles.backBnt}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#CCFF00"
          />
        </TouchableOpacity>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({

    backButton: {
        position: "absolute",
        top: 5,
        left: -125,
      },
      backBnt: {
        position: "absolute",
        top: 5,
        right: -125,
      },
})