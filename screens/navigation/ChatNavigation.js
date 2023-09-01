import { View, Text } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from '../screen/UserList';
import ChatScreen from '../screen/ChatScreen';


const Stack = createNativeStackNavigator();


const ChatNavigation = () => {
  return (
    <Stack.Navigator 
      headerMode="none" // Set the header mode to none
      screenOptions={{ headerStyle: { backgroundColor: "black" } }}
    >
      <Stack.Screen
        name="UserScreen"
        component={UserList}
        options={{ headerShown: false }}
      />  
       <Stack.Screen 
        name="ChatScrin"
        component={ChatScreen}
        options={{ headerShown: false }}
      />  
     
    </Stack.Navigator>
  )
}

export default ChatNavigation