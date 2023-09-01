import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screen/homeScreen';
import CommentScreen from '../screen/commentScreen';
import DirectMessage from '../screen/DirectMessage';
import DirectComment from '../screen/DirectComment';
import Userdetails from '../screen/Userdetails';

const Stack = createNativeStackNavigator();


const HomeNavigation = () => {
  return (
    <Stack.Navigator 
      headerMode="none" // Set the header mode to none
      screenOptions={{ headerStyle: { backgroundColor: "black" } }}
    >
      <Stack.Screen
        name="HomeScrin"
        component={HomeScreen}
        options={{ headerShown: false }}
      />  
      <Stack.Screen 
        name="CommentScrin"
        component={CommentScreen}
        options={{ headerShown: false }}
      />  
       <Stack.Screen 
        name="Message"
        component={DirectMessage}
        options={{ headerShown: false ,tabBarVisible :false}}
      /> 
      <Stack.Screen 
        name="Comment"
        component={DirectComment}
        options={{ headerShown: false ,tabBarVisible :false}}
      /> 
       <Stack.Screen 
        name="Detail"
        component={Userdetails}
        options={{ headerShown: false }}
      /> 
    {/* <Stack.Screen 
        name="ConfirmPayment"
        component={ConfirmPay}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen 
        name="WashCoin"
        component={CoinPay}
        options={{ headerShown: false }}
      />  
      <Stack.Screen 
        name="Book"
        component={BookMovie}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen 
        name="BookDetails"
        component={BookedMovieDetials}
        options={{ headerShown: false }}
      />  */}
    </Stack.Navigator>
  )
}

export default HomeNavigation