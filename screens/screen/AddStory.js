import { StyleSheet, Text, View,Modal } from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";


const AddStory = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [content, setContent] = useState();
    const [mainImage, setMainImage] = useState();

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
    

    const register = () => {
        let userData = new FormData();
        const newImageUri = "file:///" + image.split("file:/").join("");
        userData.append("image", {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split("/").pop(),
        });
        userData.append("content", content);
         console.log("checking the data",userData);
        axios
          .post(`${baseUrl}users/register`, userData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              Toast.show(
                "enter sent token to complete registration",
                Toast.LENGTH_SHORT
              );
              navigation.navigate("SignIn");
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
      <View style={styles.imageContainer}>
            <Image style={styles.imagejv} source={{ uri: mainImage }} />
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              <FontAwesome name="camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
        <View style={styles.messageInputContainer}>
          <TextInput
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholder="Type your message..."
            placeholderTextColor="#FFFFFF"
            style={styles.messageInput}
          />
          <TouchableOpacity onPress={() => register()}>
            <MaterialIcons name="send" size={24} color="#CCFF00" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  )
}

export default AddStory


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