import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeNavigation from "./HomeNavigation";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AccountNavigation from "./AccountNavigation";
import {
  Platform
} from "react-native";
import MapLocation from "./MapLocation";
import ChatNavigation from "./ChatNavigation";
const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      activeColor="#CCFF00"
      inactiveColor="#FFFFFF"
      barStyle={{
        backgroundColor: "#1B141F",
        borderWidth: 0.5,
        height:Platform.OS === 'ios' ? "18%" : "12%",
        padding: 10,
      }}
      //barStyle={{ backgroundColor: "black",borderTopColor: "#CCFF00", borderWidth: 0.5 }}
    >
      <Tab.Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="LocationScreen"
        component={MapLocation}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dumbbell" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatNavigation}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-tie" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
