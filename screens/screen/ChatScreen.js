import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import io from "socket.io-client";
import baseUrl from "../../assets/common/baseUrl";
import { useMessageContext } from "../utils/MessageContext"; // Adjust the path
import { useChat } from '../utils/useChat';

const socket = io(baseUrl);

const ChatScreen = ({ route }) => {
  const { messages} = useMessageContext();
  const { item } = route.params;
  const [user, setUser] = useState([]);
  const [message, setMessage] = useState("");

  const senderId = user.name;
  const receiverId = item.name;

  const { sendMessage,addMessage } = useChat((message) => {
    console.log("Received message:", message);
    addMessage(message);
  });

  // Implement the addMessage function to add new messages to the state
// const addMessage = (newMessage) => {
//   // Use the spread operator to create a new array with the updated message
//   setMessages((prevMessages) => [...prevMessages, newMessage]);
// };


  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(senderId, receiverId, message);
      // You can also update your component's state or perform any other actions here
      setMessage('');
    }
  };

  // const handleSendMessage = () => {
  //   if (message.trim() !== "") {
  //     const newMessage = {
  //       sender: senderId,
  //       receiver: receiverId,
  //       content: message,
  //     };

  //     sendMessage(newMessage);
  //     addMessage(newMessage);
  //     setMessage("");
  //   }
  // };

  useEffect(() => {
    AsyncStorage.getItem("userString")
      .then((data) => {
        if (data) {
          const userDetails = JSON.parse(data);
          setUser(userDetails);
        } else {
          console.log("Object not found in AsyncStorage");
        }
      })
      .catch((error) => {
        console.error("Error retrieving object:", error);
      });
  }, []);
  console.log("Messages:", messages);


  return (
    <>
      <View
        style={{ flexDirection: "row", marginTop: 45, backgroundColor: "" }}
      >
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

      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={50}
      >
        <View style={styles.container}>
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()} // Adjust the keyExtractor as needed
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.sender}>{item.sender}:</Text>
                <Text style={styles.content}>{item.content}</Text>
              </View>
            )}
          />




          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              onChangeText={(text) => setMessage(text)}
              value={message}
            />

            <Button title="Send" onPress={() => handleSendMessage()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D1B",
  },
  messageContainer: {
    backgroundColor: "gray",
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  sender: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "transparent",
  },
  input: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  sender: {
    fontWeight: "bold",
    color: "blue",
  },
  content: {
    color: "black",
  },
});
































// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Image,
//   Button,
//   TextInput,
//   KeyboardAvoidingView,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Feather } from "@expo/vector-icons";
// import io from "socket.io-client"; // Import io
// import baseUrl from "../../assets/common/baseUrl";
// import { useMessageContext } from "../utils/MessageContext"; // Adjust the path
// import {useChat }from '../utils/useChat'; 
// //const baseUrl = 'http://your-server-url'; // Replace with your server URL

// // Change the socket initialization to connect to the correct WebSocket server
// const socket = io(baseUrl);

// const ChatScreen = ({ route }) => {
//   const [user, setUser] = useState([]);
//   const [message, setMessage] = useState("");

//   const { messages, addMessage } = useMessageContext();
//   const { item } = route.params;

//   const senderId = user.name;
//   const receiverId = item.userId;

//   const { sendMessage } = useChat((message) => {
//     console.log("Received message:", message);
//     addMessage(message);
//   });

//   const handleSendMessage = () => {
//     if (message.trim() !== "") {
//       const newMessage = {
//         sender: senderId,
//         receiver: receiverId,
//         content: message,
//       };

//       sendMessage(newMessage);
//       addMessage(newMessage);
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     AsyncStorage.getItem("userString")
//       .then((data) => {
//         if (data) {
//           const userDetails = JSON.parse(data);
//           setUser(userDetails);
//         } else {
//           console.log("Object not found in AsyncStorage");
//         }
//       })
//       .catch((error) => {
//         console.error("Error retrieving object:", error);
//       });
//   }, []);

//   return (
//     <>
//       <View
//         style={{ flexDirection: "row", marginTop: 45, backgroundColor: "" }}
//       >
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Feather name="arrow-left" size={24} color="#CCFF00" />
//         </TouchableOpacity>
//         <Image
//           source={require("../../assets/shimg.png")}
//           resizeMode="contain"
//           style={{ height: 45, width: 55, alignSelf: "center" }}
//         />
//       </View>

//       <KeyboardAvoidingView
//         style={styles.container}
//         keyboardVerticalOffset={50}
//       >
//         <View style={styles.container}>
//           <FlatList
//             data={messages}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => (
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}:</Text>
//                 <Text style={styles.content}>{item.content}</Text>
//               </View>
//             )}
//           />

//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Type a message..."
//               onChangeText={(text) => setMessage(text)}
//               value={message}
//             />

//             <Button title="Send" onPress={() => handleSendMessage()} />
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1D1D1B",
//   },
//   messageContainer: {
//     backgroundColor: "gray",
//     padding: 10,
//     margin: 5,
//     borderRadius: 10,
//   },
//   sender: {
//     fontWeight: "bold",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "transparent",
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//   },
//   sender: {
//     fontWeight: "bold",
//     color: "blue",
//   },
//   content: {
//     color: "black",
//   },
// });




// // // import {
// // //   StyleSheet,
// // //   Text,
// // //   View,
// // //   FlatList,
// // //   Image,
// // //   Button,
// // //   TextInput,
// // //   KeyboardAvoidingView,
// // //   TouchableOpacity,
// // // } from "react-native";
// // // import React, { useState, useEffect } from "react";
// // // import { useChat } from "../utils/useChat";
// // // import { useMessageContext } from "../utils/MessageContext"; // Adjust the path
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // // import Header from "../utils/Header";
// // // import { Feather } from "@expo/vector-icons";
// // // import baseUrl from "../../assets/common/baseUrl";
// // // import io from 'socket.io-client'; // Import io


// // // const socket = io(baseUrl);
// // // const ChatScreen = ({ route }) => {
// // //   const { messages, addMessage } = useMessageContext();
// // //   const { item } = route.params;
// // //   //const [message, setMessages] = useState('');// Add state for message input
// // //   const [user, setUser] = useState([]);
// // //   const [message, setMessage] = useState(""); // Add state for message input

// // //   const senderId = user.name;
// // //   const receiverId = item.userId;

// // //   //const { senderId, receiverId } = route.params; // Get sender and receiver IDs

// // //     const { sendMessage } = useChat((message) => {
      
// // //     // Handle received messages here
// // //     console.log("Received message:", message);
// // //     addMessage(message);
// // //   });

 

// // //   const handleSendMessage = () => {
// // //     if (message.trim() !== "") {
// // //       const newMessage = {
// // //         sender: senderId,
// // //         receiver: receiverId,
// // //         content: message,
// // //       };

// // //       // Send the message to the server
// // //       sendMessage(newMessage);

// // //       // Add the message to the local context
// // //       addMessage(newMessage);

// // //       // Clear the message input
// // //       setMessage("");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     AsyncStorage.getItem("userString")
// // //       .then((data) => {
// // //         if (data) {
// // //           const userDetails = JSON.parse(data);
// // //           setUser(userDetails);
// // //         } else {
// // //           console.log("Object not found in AsyncStorage");
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.error("Error retrieving object:", error);
// // //       });
// // //   }, []); // Run only once
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   FlatList,
// //   Image,
// //   Button,
// //   TextInput,
// //   KeyboardAvoidingView,
// //   TouchableOpacity,
// // } from "react-native";
// // import React, { useState, useEffect } from "react";
// // import { useChat } from "../utils/useChat";
// // import { useMessageContext } from "../utils/MessageContext"; // Adjust the path
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { Feather } from "@expo/vector-icons";
// // import io from 'socket.io-client'; // Import io

// // const baseUrl = 'http://your-server-url'; // Replace with your server URL

// // // Change the socket initialization to connect to the correct WebSocket server
// // const socket = io(baseUrl);

// // const ChatScreen = ({ route }) => {
// //   const { messages, addMessage } = useMessageContext();
// //   const { item } = route.params;
// //   const [user, setUser] = useState([]);
// //   const [message, setMessage] = useState("");

// //   const senderId = user.name;
// //   const receiverId = item.userId;

// //   const { sendMessage } = useChat((message) => {
// //     console.log("Received message:", message);
// //     addMessage(message);
// //   });

// //   const handleSendMessage = () => {
// //     if (message.trim() !== "") {
// //       const newMessage = {
// //         sender: senderId,
// //         receiver: receiverId,
// //         content: message,
// //       };

// //       sendMessage(newMessage);
// //       addMessage(newMessage);
// //       setMessage("");
// //     }
// //   };

// //   useEffect(() => {
// //     AsyncStorage.getItem("userString")
// //       .then((data) => {
// //         if (data) {
// //           const userDetails = JSON.parse(data);
// //           setUser(userDetails);
// //         } else {
// //           console.log("Object not found in AsyncStorage");
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Error retrieving object:", error);
// //       });
// //   }, []);

// //   return (
// //     <>
// //       <View
// //         style={{ flexDirection: "row", marginTop: 45, backgroundColor: "" }}
// //       >
// //         <TouchableOpacity
// //           style={styles.backButton}
// //           onPress={() => navigation.goBack()}
// //         >
// //           <Feather name="arrow-left" size={24} color="#CCFF00" />
// //         </TouchableOpacity>
// //         <Image
// //           source={require("../../assets/shimg.png")}
// //           resizeMode="contain"
// //           style={{ height: 45, width: 55, alignSelf: "center" }}
// //         />
// //       </View>

// //       <KeyboardAvoidingView
// //         style={styles.container}
// //         keyboardVerticalOffset={50}
// //       >
// //         <View style={styles.container}>
// //           <FlatList
// //             data={messages}
// //             keyExtractor={(item) => item._id}
// //             renderItem={({ item }) => (
// //               <View style={styles.messageContainer}>
// //                 <Text style={styles.sender}>{item.sender}:</Text>
// //                 <Text style={styles.content}>{item.content}</Text>
// //               </View>
// //             )}
// //           />

// //           <View style={styles.inputContainer}>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Type a message..."
// //               onChangeText={(text) => setMessage(text)} // Here, setMessage is used to update the message state
// //               value={message}
// //             />

// //             <Button title="Send" onPress={() => handleSendMessage()} />
// //           </View>
// //         </View>
// //       </KeyboardAvoidingView>
// //     </>
// //   );
// // };
// // export default ChatScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#1D1D1B", // Background color for the entire screen
// //   },
// //   messageContainer: {
// //     backgroundColor: "gray", // Background color for each message
// //     padding: 10,
// //     margin: 5,
// //     borderRadius: 10,
// //   },
// //   sender: {
// //     fontWeight: "bold",
// //   },
// //   //content: {},
// //   inputContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "transparent", // Background color for the input container
// //   },
// //   input: {
// //     flex: 1,
// //     padding: 10,
// //     marginRight: 10,
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     borderRadius: 8,
// //   },
// //   sender: {
// //     fontWeight: "bold",
// //     color: "blue", // Or any other distinct color
// //   },
// //   content: {
// //     color: "black", // Or any other preferred color
// //   },
// // });





















