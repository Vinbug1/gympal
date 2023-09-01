import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GymLocation from '../screen/GymLocation';
import GymMap from '../screen/GymMap';

const Stack = createNativeStackNavigator();


const MapLocation = () => {
  return (
    <Stack.Navigator 
    headerMode="none" // Set the header mode to none
    screenOptions={{ headerStyle: { backgroundColor: "black" } }}
  >
    <Stack.Screen
      name="GmyScreen"
      component={GymLocation}
      options={{ headerShown: false }}
    />  
     <Stack.Screen 
      name="MapView"
      component={GymMap}
      options={{ headerShown: false }}
    />  
    
  </Stack.Navigator>
  )
}

export default MapLocation
