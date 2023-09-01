import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Input = (props) => {
  return (
    <TextInput
    style={styles.aptinput}
    placeholder={props.placeholder}
    placeholderTextColor="#FFFFFF" 
    name={props.name}
    id={props.id}
    value={props.value}
    autoCorrect={props.autoCorrect}
    onChangeText={props.onChangeText}
    onFocus={props.onFocus}
    secureTextEntry={props.secureTextEntry}
    keyboardType={props.keyboardType}
    >
    </TextInput>
  )
}

export default Input

const styles = StyleSheet.create({
    aptinput: {
        width: '100%',
        height: 48,
        backgroundColor: '#48434B',
        margin: 10,
        borderRadius: 5,
        padding: 6,
        alignSelf:'center',
       // borderWidth: 0.5,
        //borderColor: '#039C03'
    },
})