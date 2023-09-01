import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import UserCard from "./UserCard";
import PostCard from "./PostCard";
import Modal from "react-native-modal";
import mime from "mime";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../utils/Input";
import Toast from "react-native-root-toast";
import Header from '../utils/Header';

const homeScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [content, setContent] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalStoryVisible, setModalStoryVisible] = useState(false);
  // const [posts,setPosts] = useState();// State for modal visibility

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    const postData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");

    postData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    postData.append("content", content);
    postData.append("user", user);

    //console.log("Checking the data:", postData);

    axios
      .post(`${baseUrl}posts`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Toast.show("Posting was successful", Toast.LENGTH_SHORT);
          toggleModal();
        }
      })
      .catch((error) => {
        if (error.response) {
          Toast.show(error.message, Toast.LENGTH_SHORT);
        } else if (error.request) {
          Toast.show("No response from the server", Toast.LENGTH_SHORT);
        } else {
          Toast.show("Error in request setup", Toast.LENGTH_SHORT);
        }
      });
  };

  const handleStory = () => {
    const postData = new FormData();
    const newImageUri = "file:///" + image.split("file:/").join("");

    postData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    postData.append("content", content);
    postData.append("user", user);

    //console.log("Checking the data:", postData);

    axios
      .post(`${baseUrl}stories`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Toast.show("Posting was successful", Toast.LENGTH_SHORT);
          toggleStoryModal();
        }
      })
      .catch((error) => {
        if (error.response) {
          Toast.show(error.message, Toast.LENGTH_SHORT);
        } else if (error.request) {
          Toast.show("No response from the server", Toast.LENGTH_SHORT);
        } else {
          Toast.show("Error in request setup", Toast.LENGTH_SHORT);
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("userString")
        .then((userDetails) => {
          if (userDetails) {
            const user = JSON.parse(userDetails);
            setUser(user.userId);
            // console.log(user);
          } else {
            console.log(" Object not found in AsyncStorage");
          }
        })
        .catch((error) => {
          console.error("Error retrieving object:", error);
        });
      return () => {
        setUser();
      };
    }, [])
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleStoryModal = () => {
    setModalStoryVisible(!isModalStoryVisible);
  };


  return (
    <View style={styles.container}>
      <Header />
      
      <View style={{ backgroundColor: "#1D1D1B", flex: 1, width: "100%" }}>
        <TouchableOpacity onPress={toggleStoryModal} style={{backgroundColor:"#CCFF00",height:35,width:125,borderRadius:5,margin:12}}>
          <Text
            style={{
              fontSize: 16,
              color: "#1D1D1B",
              fontWeight: "bold",
              marginTop: 5,
              padding: 2,
              alignSelf: "center"
            }}
          >
            Add Story
          </Text>
        </TouchableOpacity>
        <View>
          <View style={{ width: "100%", height: 130, padding: 16 }}>
            {/* <Text>Online Users</Text> */}
            <UserCard />
          </View>
          <View style={{position:"absolute",top:172,margin:15}}>
          <Text style={{color:"#FFFFFF",fontSize:18}}>Posts</Text>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
              marginTop: 65,
            }}
          >
            {/* <Text>Online Users</Text> */}
            <PostCard />
          </View>
        </View>
        <TouchableOpacity style={styles.fab} onPress={toggleModal}>
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Modal section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity
            onPress={toggleModal}
            style={{ position: "absolute", top: 5, left: 5 }}
          >
            <MaterialIcons name="cancel" size={24} color="#CCFF00" />
          </TouchableOpacity>
          <SafeAreaView>
            <View style={styles.imageContainer}>
              <Image style={styles.imagejv} source={{ uri: mainImage }} />
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.imagePicker}
              >
                <FontAwesome name="camera" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20, width: 350 }}>
              <Input
                placeholder="Content"
                onChangeText={(text) => setContent(text)}
                value={content}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Submit</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalStoryVisible}
        onRequestClose={toggleStoryModal}
      >
        {/* <TouchableOpacity onPress={toggleStoryModal}> */}
        <View style={styles.modalBackground}>
          <TouchableOpacity
            onPress={toggleStoryModal}
            style={{ position: "absolute", top: 5, left: 5 }}
          >
            <MaterialIcons name="cancel" size={24} color="#CCFF00" />
          </TouchableOpacity>
          <SafeAreaView>
            <View style={styles.imageContainer}>
              <Image style={styles.imagejv} source={{ uri: mainImage }} />
              <TouchableOpacity
                onPress={() => pickImage()}
                style={styles.imagePicker}
              >
                <FontAwesome name="camera" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20, width: 350 }}>
              <Input
                placeholder="Content"
                onChangeText={(text) => setContent(text)}
                value={content}
              />
            </View>
            <TouchableOpacity
              onPress={() => handleStory()}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Submit</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        {/* </TouchableOpacity> */}
      </Modal>
    </View>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1B141F",
  },
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

  imageContainer: {
    width: 310,
    height: 250,
    //borderStyle: "solid",
    //borderWidth: 1,
    margin: 5,
    justifyContent: "center",
    borderRadius: 5,
    //borderColor: "#CCFF00",
    //elevation: 2,
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
  imagejv: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    //alignSelf: "center",
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#CCFF00",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  modalBackground: {
    height: "75%",
    width: "99%",
    backgroundColor: "#1D1D1B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#CCFF00",
  },
  nextButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    position: "absolute",
    bottom: -60,
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

//   const handleSubmit = () => {
//     let postData = new FormData();
//   const newImageUri = "file:///" + image.split("file:/").join("");
//   postData.append("image", {
//     uri: newImageUri,
//     type: mime.getType(newImageUri),
//     name: newImageUri.split("/").pop(),
//   });
//   postData.append("content", content);
//   postData.append("user", user);
//  console.log("checking the data",postData);
//   axios.post(`${baseUrl}posts`, postData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         Toast.show("Posting was succeful", Toast.LENGTH_SHORT);
//         toggleModal();
//       }
//     })
//     .catch((error) => {
//       if (error.response) {
//         Toast.show(error.message, Toast.LENGTH_SHORT);

//       } else if (error.request) {
//         Toast.show("No response from the server", Toast.LENGTH_SHORT);
//       } else {
//         Toast.show("Error in request setup", Toast.LENGTH_SHORT);
//       }
//     });
//   };

// useFocusEffect(
//   useCallback(() => {
//     AsyncStorage.getItem("jwt").then((tkn) => {
//       axios({
//         method: "GET",
//         url: `${baseUrl}posts`,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + tkn,
//         },
//       })
//         .then((res) => {
//           setPosts(res.data);
//           console.log(res.data);
//         })
//         .catch((error) => {
//           Toast.show(error.message, Toast.LENGTH_SHORT);
//         });

//       // axios({
//       //   method: "GET",
//       //   url: `${baseUrl}users/`,
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: "Bearer " + tkn,
//       //   },
//       // })
//       //   .then((res) => {
//       //     //setLoading(false);
//       //     //setVendors(res.data);
//       //   })
//       //   .catch((error) => {
//       //     Toast.show(error.message, Toast.LENGTH_SHORT);
//       //   });
//       return () => {
//         setFriends([]);
//        // setVendors([]);
//         //setProductsFiltered([]);
//       };
//     });
//   }, [])
// );
