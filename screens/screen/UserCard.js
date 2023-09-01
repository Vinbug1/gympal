import React,{useState,  useCallback, useEffect } from "react";
import { View,Text,ImageBackground,StyleSheet,ScrollView,TouchableOpacity,Image} from "react-native";
import Toast from "react-native-root-toast";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const post = require("../../assets/posts.json");
const ITEM_SIZE = 160;
const ITEM_WIDTH = 120;
const ITEM_MARGIN = 10;

const UserCard = () => {
  const navigation = useNavigation();
  // uncomment this state  to use real time data
  // //const [post, setPost ]= useState();
  // const [tkn, setTkn ]= useState();
  // const [loading, setLoading] = useState(true);
 const[story,setStory] = useState();
 const[user,setUser] = useState();

  const next = () =>{
  navigation.navigate("Message", {item: item});
}

const fetchPosts = useCallback(() => {
    axios
      .get(`${baseUrl}stories`)
      .then((res) => {
        setStory(res.data);
        //console.log("Working things out ",story );
      })
      .catch((error) => {
        console.log("stories feedback:", error.message);
      });
  }, []);


  useEffect(() => {
        fetchPosts(); // Fetch initial posts
    const removeExpiredStories = () => {
      const currentTime = Date.now();
      const updatedStories = story.filter(
        (story) => currentTime - story.timestamp <= 24 * 60 * 60 * 1000
      );
      setStory(updatedStories);
    };
         const intervalId = setInterval(fetchPosts, 5 * 60 * 1000); // Fetch new posts every 5 minutes
    const timer = setInterval(removeExpiredStories, 60 * 60 * 1000); // Check every hour

    return () => {
      clearInterval(timer);
      clearInterval(intervalId); // Clear the interval when component unmounts

    };
  }, [story]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {story?.map((item, index) => (
        //{user.map((item, index) => (
          <View key={index}>
            <TouchableOpacity style={styles.item}  onPress={() => navigation.navigate("Message", { item: post[index]})}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item.image }}
              />
                <View style={styles.profile}>
                  <Image
                    style={styles.proimg}
                    resizeMode="cover"
                    source={{ uri: item.user.image }}
                  />
                  <Text style={styles.txtt}>{item.user.name}</Text>
                </View>
              {/* </Image> */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
//   const calculateTimeRemaining = (timestamp) => {
//   const currentTime = Date.now();
//   const timeDiff = 24 * 60 * 60 * 1000 - (currentTime - timestamp);

//   const hours = Math.floor(timeDiff / (60 * 60 * 1000));
//   const minutes = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
//   const seconds = Math.floor((timeDiff % (60 * 1000)) / 1000);

//   return `${hours}h ${minutes}m ${seconds}s`;
// };

};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: ITEM_SIZE + 20,
    //elevation: 45,
    //margin: 10,
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: ITEM_MARGIN / 2,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: ITEM_WIDTH,
    height: ITEM_SIZE,
    borderRadius: 6,
  },
  image: {
    width: "93%",
    height: 140,
    backgroundColor: "transparent",
    borderRadius: 20,
    //borderWidth: 0.5,
    //borderColor: "#CCFF00",
    padding: 15,
    alignSelf: "center",
    //alignContent: "center",
  },
  profile: {
    height: 40,
    width: "90%",
    borderRadius: 13,
    position: "absolute",
    bottom: 9,
    alignSelf: "center",
  },
  proimg: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#CCFF00",
    padding: 5,
    alignSelf: "center",
    position: "absolute",
    top: -20,
  },
  txtt: {
    fontSize: 11,
    color: "#FFFFFF",
    position: "absolute",
    bottom: 9,
    alignSelf: "center",
  },
});

export default UserCard;
