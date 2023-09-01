import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const CheckboxTextInput = ({ label, isSelected, onRadioBtnClick }) => (
  <TouchableOpacity onPress={onRadioBtnClick}>
    <View style={styles.checkboxTextInputContainer}>
      <View style={styles.checkboxContainer}>
        <Checkbox value={isSelected} onValueChange={onRadioBtnClick} style={styles.checkbox} />
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
    height: 55,
    width: '99%',
    margin: 15,
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

export default CheckboxTextInput;

