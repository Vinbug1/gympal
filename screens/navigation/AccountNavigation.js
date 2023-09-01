import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from '../screen/Profile';
import UserProfile from '../screen/UserProfile';


const Stack = createNativeStackNavigator();


const AccountNavigation = () => {
  return (
    <Stack.Navigator 
      headerMode="none" // Set the header mode to none
      screenOptions={{ headerStyle: { backgroundColor: "black" } }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerShown: false }}
      />  
       <Stack.Screen 
        name="UserProfileScreen"
        component={UserProfile}
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

export default AccountNavigation