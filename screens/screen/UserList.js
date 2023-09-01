import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
} from "react-native";import React, { useRef, useState, useEffect,useCallback } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-root-toast";
import baseUrl from "../../assets/common/baseUrl";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import Header from "../utils/Header";
const UserList = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(
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

        return () => {
          setFriends([]);
         // setVendors([]);
          //setProductsFiltered([]);
        };
      });
    }, [])
  );

  const renderFriendCardItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ChatScrin", { item: item })}>
        
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

  return (
    <View style={styles.container}>
      <Header />
              <FlatList
  data={friends}
  keyExtractor={(item, index) => index.toString()} // Use index as the key
  renderItem={renderFriendCardItem}
/>
    </View>
  )
}

export default UserList

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