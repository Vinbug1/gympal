import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ImageBackground,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import {  AntDesign  } from "@expo/vector-icons";
import socketIOClient from 'socket.io-client';
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";


const Userdetails = ({route}) => {
    const socket = socketIOClient(baseUrl); // Change to your backend URL

    const { item } = route.params;
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const  [recipient, setRecipient] = useState();
   

      const sendFriendRequest = () => {
        const friendRequest = {
          sender: recipient.userId,
          recipient: item.userId,
          status: 'pending',
        };
        socket.emit('newFriendRequest', friendRequest);
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
            setRecipient(res.data);
            console.log("welcome on board",recipient);
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
    
  return (
    // <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign  name="arrowleft" size={28} color="#CCFF00" />
          </TouchableOpacity>
        </View>
          <Text style={styles.headerText}>Connect to  your pals </Text>
        <View style={styles.content}>
          <Image source={{ uri: item.image }} resizeMode="cover" style={styles.img} />
     
          {/* </ImageBackground> */}
     <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:5}}>
     <TouchableOpacity style={styles.disconect} onPress={() => sendFriendRequest()}>
        <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:16, padding:15}}>Dislike</Text>
     </TouchableOpacity>

     <TouchableOpacity style={styles.conect} onPress={() => sendFriendRequest()}>
        <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:16, padding:15}}>Connect</Text>
     </TouchableOpacity>
     </View>
                
        </View>
      </View>
    // </Modal>
  )
}

export default Userdetails
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: "#1D1D1B",
    },
    header: {
      flexDirection: "row",
      marginTop: 65,
      paddingHorizontal: 15,
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerText: {
      fontSize: 16,
      color: "#FFFFFF",
      fontWeight: "normal",
      marginTop: 5,
      padding: 2,
      alignSelf:"center",
    },
    closeButton: {
      position: "absolute",
      top: 3,
      leftt: 25,
    },
    content: {
      backgroundColor: "#1D1D1B",
      height: "90%",
      width: "100%",
      alignSelf: "center",
      borderRadius:15
    },
    img: {
      width: "95%",
      height: "89%",
      //backgroundColor: "white",
      borderRadius: 15,
      //borderWith:0.5,
      alignSelf: "center",
      marginTop: 25,
    },
    messageInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginLeft: 10,
    },
    messageInput: {
      height: 43,
      width: "79%",
      margin: 8,
      padding: 8,
      backgroundColor: "#48434B",
      borderRadius: 5,
    },
    conect:{
        backgroundColor:"#CCFF00",
        height:45,
        width:"35%",
        position:"absolute",
        right:25,
        bottom:35,
        borderRadius:7
    },
    disconect:{
        backgroundColor:"#8E8E8D",
        height:45,
        width:"35%",
        position:"absolute",
        left:25,
        bottom:35,
        borderRadius:7
    }
  });
  