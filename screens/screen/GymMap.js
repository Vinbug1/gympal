import React, { useEffect, useState, useRef } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline,Callout } from 'react-native-maps';
import { AntDesign,Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const GymMap = ({route}) => {
    const {  selectedUser,handleBackNavigation  } = route.params;
    const navigation = useNavigation();
    const [currentLocation, setCurrentLocation] = useState(null);
  
    const userLocation = {
      latitude: parseFloat(selectedUser.latitude),
      longitude: parseFloat(selectedUser.longitude),
    };
    const handleBackButtonPress = () => {
      handleBackNavigation(); 
      navigation.goBack();// Call the handleBackNavigation function when the back button is pressed
    };
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied.');
        }
  
        let locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (location) => {
            setCurrentLocation(location);
          }
        );
  
        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      })();
    }, []);
  
  
    // Custom marker component for the user location
    const UserMarker = () => (
      <View style={styles.userMarker}>
        <Foundation name="marker" size={23} color="#039C03" />
      </View>
    );
  
    // Custom marker component for the selected user's location
    const SelectedUserMarker = () => (
      <View style={styles.selectedUserMarker}>
        <Foundation name="marker" size={23} color="#039C03" />
      </View>
    );
  
  
  
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
            initialRegion={{
              latitude: currentLocation ? currentLocation.coords.latitude : userLocation.latitude,
              longitude: currentLocation ? currentLocation.coords.longitude : userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
    
          }}
      >
         {/* Display current user location with a custom marker */}
         {currentLocation && (
            <Marker coordinate={currentLocation.coords} title="Your Location" pinColor="#039C03"  icon={UserMarker()}/>
          )}
   <Marker coordinate={userLocation} title={selectedUser.username} icon={SelectedUserMarker()}>
          <Callout>
             <View>
                <Text>Username: {selectedUser.username}</Text>
                <Text>Address: {selectedUser.address}</Text>
                {/* Add more user information as needed */}
              </View>
  
          </Callout>
        </Marker>
  
          {/* Polyline to draw the straight line */}
          {currentLocation && (
            <Polyline
              coordinates={[
                {
                  latitude: currentLocation.coords.latitude,
                  longitude: currentLocation.coords.longitude,
                },
                userLocation,
              ]}
              strokeColor="#FF0000"
              strokeWidth={3}
            />
          )}
  
       
      </MapView>
  
      {/* Back navigation button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackButtonPress}
      >
        <AntDesign name="leftcircleo" size={28} color="#039C03" />
      </TouchableOpacity>
    </View>
    );
}

export default GymMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
      },
      backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
      },
      userMarker: {
        backgroundColor: '#CCFF00',
        padding: 8,
        borderRadius: 100,
      },
      selectedUserMarker: {
        backgroundColor: '#CCFF00',
        padding: 8,
        borderRadius: 100,
      },
    
})