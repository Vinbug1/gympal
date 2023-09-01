import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InputSelect = ({ isSelected, placeholder, onSelect }) => {
  const containerStyles = [styles.container];
  if (isSelected) {
    containerStyles.push(styles.selectedContainer);
  }

  return (
    <TouchableOpacity style={containerStyles} onPress={onSelect}>
      <Text style={styles.input}>{isSelected ? placeholder : ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 100,
    padding: 14,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    margin: 19,
  },
  selectedContainer: {
    backgroundColor: 'white',
  },
  input: {
    color: 'white', // Placeholder text color
  },
});

export default InputSelect;













// import React from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// const InputSelect = ({ isSelected, placeholder, onSelect }) => {
  
//   const containerStyles = [styles.container];
//   if (isSelected) {
//     containerStyles.push(styles.selectedContainer);
//   }

//   return (
//     <TouchableOpacity style={styles.container} onPress={onSelect}>
//       <TextInput
//         style={styles.input}
//         value={isSelected ? placeholder : ''}
//         placeholder={placeholder}
//         placeholderTextColor="#FFFFFF"
//         editable={false}
//       />
//     </TouchableOpacity>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     padding: 13,
//   },
//   input: {
//     height: 38,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 25,
//   },
// });

// export default InputSelect;
