import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import { useChat } from "../utils/useChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Import axios

const DirectMessage = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [userdetails, setUserDetails] = useState(null); // Initialize with null
  const recipientId = item.userId;

  // Fetch userdetails
  useEffect(() => {
    AsyncStorage.getItem("userString")
      .then((data) => {
        if (data) {
          const user = JSON.parse(data);
          setUserDetails(user);
        } else {
          console.log("Object not found in AsyncStorage");
        }
      })
      .catch((error) => {
        console.error("Error retrieving object:", error);
      });
  }, []); // Run only once

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    navigation.goBack(); // Navigate back when closing the modal
  };

  const { sendMessage } = useChat((message) => {});

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    if (userdetails && userdetails.userId) {
      const senderId = userdetails.userId;

      // Send message using REST API
      axios.post("/send-message", {
        sender: senderId,
        recipient: recipientId,
        content: message,
      });

      // Send message using WebSocket
      sendMessage(senderId, recipientId, message);

      setMessage("");
    } else {
      console.error("Sender details not available");
    }
  };
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Direct Message</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => toggleModal()}
          >
            <MaterialIcons name="cancel" size={28} color="#CCFF00" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Image source={{ uri: item.image }} resizeMode="contain" style={styles.img} />
          <View style={styles.messageInputContainer}>
            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="Type your message..."
              placeholderTextColor="#FFFFFF"
              style={styles.messageInput}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <MaterialIcons name="send" size={24} color="#CCFF00" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DirectMessage;

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
  },
  closeButton: {
    position: "absolute",
    top: 3,
    right: 25,
  },
  content: {
    backgroundColor: "#1D1D1B",
    height: "90%",
    width: "100%",
  },
  img: {
    width: "90%",
    height: "75%",
    //backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 65,
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
});



// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Modal,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { useChat } from "../utils/useChat";
// import Input from "../utils/Input";
// import baseUrl from "../../assets/common/baseUrl";

// const DirectMessage = ({ route }) => {
//   const { item } = route.params;
//   const navigation = useNavigation();
//   const [message, setMessage] = useState("");
//   const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//     navigation.goBack();
//   };

//   const { sendMessage } = useChat((message) => {
//     // Handle incoming messages here if needed
//   });

//   const handleSendMessage = () => {
//     if (message.trim() === "") {
//       return;
//     }

//     // Send message using REST API (Adjust the URL)
//     axios.post("http://your-backend-api-url/send-message", {
//       sender: senderId,
//       recipient: recipientId,
//       content: message,
//     });
//     sendMessage(senderId, recipientId, message);

//     setMessage("");
//   };

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
//           Toast.show("Please provide correct credentials", Toast.LENGTH_SHORT);
//         }
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     // <View style={styles.container}>
//     <Modal>
//       <View
//         style={{ backgroundColor: "#1D1D1B", height: "100%", width: "100%" }}
//       >
//         <View style={{ flexDirection: "row", marginTop: 65, justifyContent:"space-between"}}>
//           <View>
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: "#FFFFFF",
//                 fontWeight: "normal",
//                 marginTop: 5,
//                 padding: 2,
//               }}
//             >
//               direct message
//             </Text>
//           </View>
//           <View>
//           <TouchableOpacity
//             style={styles.backBnt}
//             onPress={() => toggleModal()}
//           >
//             <MaterialIcons name="cancel" size={28} color="#CCFF00" />
//           </TouchableOpacity>

//           </View>
//         </View>
//         <View>
//           <Image
//             source={{ uri: item.image }}
//             resizeMode="contian"
//             style={styles.img}
//           />
//           <View style={styles.messageInputContainer}>
//             <TextInput
//               value={message}
//               onChangeText={(text) => setMessage(text)}
//               placeholder="Type your message..."
//               placeholderTextColor="#FFFFFF"
//               style={styles.messageInput}
//             />

//             <TouchableOpacity >
//               <MaterialIcons name="send" size={24} color="#CCFF00" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//     // </View>
//   );
// };

// export default DirectMessage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     //backgroundColor: "#1B141F",
//   },
//   backBnt: {
//     position: "absolute",
//     top: 5,
//     right: 25,
//   },

//   imagejv: {
//     width: 120,
//     height: 120,
//     borderRadius: 75,
//     alignSelf: "center",
//   },
//   dropdownItem: {
//     paddingHorizontal: 16, // Add left and right padding for spacing
//     paddingVertical: 10, // Add top and bottom padding for spacing
//   },
//   img: {
//     width: "90%",
//     height: "75%",
//     backgroundColor: "white",
//     borderRadius: 15,
//     //borderWidth: 1,
//     //borderColor: "#CCFF00",
//     alignSelf: "center",
//     marginTop: 65,
//   },
//   messageInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "center",
//     marginLeft: 10,
//   },
//   messageInput: {
//     height: 43,
//     width: "79%",
//     margin: 8,
//     padding: 8,
//     backgroundColor: "#48434B",
//     borderRadius: 5,
//     //borderColor:"#48434B",
//   },
// });
