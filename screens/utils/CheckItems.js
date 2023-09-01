// CheckItems.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const CheckItems = ({ label, isSelected, onBtnClick }) => (
  <TouchableOpacity onPress={onBtnClick}>
    <View style={styles.checkboxTextInputContainer}>
      <View style={styles.checkboxContainer}>
        <Checkbox value={isSelected} onValueChange={onBtnClick} style={styles.checkbox} />
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 4,
    height: 60,
    width: '99%',
    margin: 4,
  },
  checkboxContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginRight: 10,
  },
  checkbox: {
    borderRadius: 50,
  },
  radioLabel: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
});

export default CheckItems;






// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Checkbox from 'expo-checkbox';


// const CheckItems = ({ label, isSelected, onBtnClick }) => (
//   <TouchableOpacity onPress={onBtnClick}>
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       <View style={{ width: 20, height: 20, marginRight: 10, borderWidth: 1 }}>
//         {isSelected && <View style={{ flex: 1, backgroundColor: 'blue' }} />}
//       </View>
//       <Text style={{ fontSize: 16, color: 'black' }}>{label}</Text>
//     </View>
//   </TouchableOpacity>
// );


// const styles = StyleSheet.create({
//   checkboxTextInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//     padding: 4,
//     height: 50,
//     width: '96%',
//     margin: 7,
//   },
//   checkboxContainer: {
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//     marginRight: 10,
//   },
//   checkbox: {
//     borderRadius: 50,
//   },
//   radioLabel: {
//     flex: 1,
//     fontSize: 16,
//     color: 'white',
//   },
// });

// export default CheckItems;

