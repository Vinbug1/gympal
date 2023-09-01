import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserNavigation from './UserNavigation';
import BottomNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator();
const MainNavigations = () => {
  return (
    <Stack.Navigator 
    headerModal="non"
    screenOptions={{ headerStyle: { backgroundColor: "#fff" } }}
    >
      <Stack.Screen
        name="User"
        component={UserNavigation}
        options={{ headerShown: false }}
      
      />  
       <Stack.Screen 
        name="MainScreen"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />   

           
       
      {/* <Stack.Screen />  
      <Stack.Screen />  
      <Stack.Screen />   */}
    </Stack.Navigator>
  )
}

export default MainNavigations