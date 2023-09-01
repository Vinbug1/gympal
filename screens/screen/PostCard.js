import React,{useState,useCallback,useEffect} from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons,Entypo,Ionicons   } from '@expo/vector-icons';
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import { createIconSetFromFontello } from "react-native-vector-icons";

//const post = require("../../assets/posts.json");
const { width } = Dimensions.get("window");
const ITEM_SIZE = 160;
const ITEM_MARGIN = 10;

const PostCard = () => {
  //const {posts} = props;
  const navigation = useNavigation();
   const [posts, setPosts] = useState([]);
   const [totalLikes, setTotalLikes] = useState(0);

  const fetchPosts = useCallback(() => {
    axios
      .get(`${baseUrl}posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log("post feedback:", error.message);
      });
  }, []);


  useEffect(() => {
    fetchPosts(); // Fetch initial posts
    const intervalId = setInterval(fetchPosts, 30 * 60 * 1000); // Fetch new posts every 5 minutes

    return () => {
      clearInterval(intervalId); // Clear the interval when component unmounts
    };
  }, [fetchPosts]);


  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        vertical
      >
        {posts?.map((item,index) => (
           //console.log("trying the image",item),
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate("Comment", { item })}
          >
            <View style={styles.profile}>
              <Image
               source={{uri:item.user.image}}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={{ flexDirection: "column",position:"absolute",top:-365 }}>
                <View style={{padding:6}}>
                 <Text style={styles.tstt}>{item.user.name}</Text>
                </View>
                <View style={{padding:6}}>
                <Text style={styles.tstt}>{item.user.phoneNumber}</Text>
                </View>
                <View style={{padding:6}}>
                    <Text style={styles.tstt}>{item.user.email}</Text>
                </View>
              </View>
            </View>
            <Image
              style={styles.imag}
              resizeMode="contain"
              source={{ uri: item.image }}
            
            />
            {/* Rest of your code */}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
   // elevation: 5,
    //padding: 15,
   marginTop: 15
  },
  scrollContainer: {
    flexDirection: "column",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    paddingVertical: ITEM_MARGIN / 2,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 339,
    borderRadius: 6,
    //borderColor: "#CCFF00",
    //borderWidth: 1,

    marginBottom: ITEM_MARGIN / 2,
  },


  image: {
    width: 35,
    height: 35,
    //backgroundColor: "#CCFF00",
    borderRadius: 125,
    borderWidth: 1,
    borderColor: "#CCFF00",
    position:"absolute",
    top: -16,
  },
  imag: {
    width: "85%",
    height: "75%",
    //backgroundColor: "transparent",
    borderRadius: 25,
    //borderWidth: 1,
    //borderColor: "#CCFF00",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "#FFFFFF",
  },
  proimg:{
    width: "9%",
    height: 35,
    borderRadius: 25,
    //borderWidth: 1,
    //borderColor: "#CCFF00",
    padding: 5,
    //alignSelf:"center",
    position:"absolute",
    top: 1,
    left: 9
    
  },
  txtt:{
    fontSize:11,
    color:"#FFFFFF",
    position:"absolute",
    bottom: 9,
    alignSelf:"center",
  },
  tstt:{
    fontSize:11,
    color:"#FFFFFF",
    position:"absolute",
    left:52,
    alignSelf:"center",
    margin:5
  },
  profile: {
    flexDirection: "row",
    height:40,
    width:"100%", 
     position:"absolute",
     top:12, 
     alignSelf:"center"
  },
});

export default PostCard;
