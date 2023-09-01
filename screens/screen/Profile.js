import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import Header from "../utils/Header";
import PostList from "../user/PostList";

//const userPosts = require("../../assets/posts.json");
const { width } = Dimensions.get("window");
// const ITEM_WIDTH = SCREEN_WIDTH * 0.9;
// const ITEM_HEIGHT = ITEM_WIDTH * 0.6;
const Profile = () => {
  const [user, setUser] = useState();
  //const [tkn, setTkn] = useState();
  const [postCount, setPostCount] = useState(0);
  const [livePosts, setLivePosts] = useState([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  // Fetch userdetails
  useEffect(() => {
    AsyncStorage.getItem("userString")
      .then((data) => {
        if (data) {
          const userDetails = JSON.parse(data);
          setUser(userDetails);
          console.log(user);
          //setTkn(user.token);
        } else {
            console.log("Object not found in AsyncStorage");
          }
          // Fetch post count

          fetch(`${baseUrl}posts/user-posts/${user.userId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Network response was not ok: ${response.status}`
                );
              }
              return response.json();
            })
            .then((data) => {
                console.log(data);
              // Handle the data received from the server
              const post = data.postCount;
              const userPosts = data.userPosts;
              setPostCount(post);
              setLivePosts(userPosts);

              // Now you can use 'postCount' and 'userPosts' in your frontend UI
            })
            .catch((error) => {
              console.error("Error fetching user posts:", error);
              // Handle the error, such as displaying an error message on the UI
            });

          axios
            .get(`/user/${user.userId}/followers/count`) // Replace 'user.id' with the actual user ID
            .then((response) => {
              setFollowersCount(response.data.followersCount);
            })
            .catch((error) => {
              console.error("Error fetching followers count:", error);
            });

          // Fetch following count
          axios
            .get(`/user/${user.userId}/following/count`) // Replace 'user.id' with the actual user ID
            .then((response) => {
              setFollowingCount(response.data.followingCount);
            })
            .catch((error) => {
              console.error("Error fetching following count:", error);
            });
        
      })
      .catch((error) => {
        console.error("Error retrieving object:", error);
      });
  }, []);
  // Run only once

  const renderItem = ({ item }) => (
    <View style={styles.pstcontainer}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={{
          uri: item.image,
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View
        style={{
          backgroundColor: "#1D1D1B",
          marginTop: 10,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          source={{ uri: user?.image }} // Use optional chaining to prevent errors if user is not set yet
          style={styles.imag}
          resizeMode="cover"
        />
        <View style={{ alignSelf: "stretch", padding: 15 }}>
          <Text style={styles.txt}>{user?.name}</Text>
          {/* <Text style={styles.txt}>Email:{user?.phone}</Text> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ margin: 15 }}>
            <Text style={styles.txt}>{postCount} Posts</Text>
          </View>
          <View style={{ margin: 15 }}>
            <Text style={styles.txt}>{followersCount} followers</Text>
          </View>
          <View style={{ margin: 15 }}>
            <Text style={styles.txt}>{followingCount} following</Text>
          </View>
        </View>
        <View style={{ alignSelf: "stretch", padding: 15 }}>
          <Text style={styles.txt}>biography:{user?.biography}</Text>
        </View>
        <View style={{ margin: 12 }}>
          <FlatList
            data={livePosts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={1} // Display two columns
            //bounces={false} // or true, depending on your preference
            overScrollMode="never" // or "auto", depending on your preference
            // getItemLayout={(livePosts, index) => ({
            //   length: ITEM_HEIGHT,
            //   offset: ITEM_HEIGHT * index,
            //   index,
            // })}
          />
        </View>
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Profile;

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
  safe: {
    //flex: 1,
    backgroundColor: "#1D1D1B",
  },

  imag: {
    width: "98%",
    height: "30%",
    //backgroundColor: "#CCFF00",
    borderRadius: 5,
    //borderWidth: 1,
    //borderColor: "#CCFF00",
    margin: 10,
    alignSelf: "center",
  },
  txt: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  pstcontainer: {
    width: "95%",
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    //backgroundColor: "transparent",
    // position: "absolute",
    // top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
