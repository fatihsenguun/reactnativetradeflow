import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({text,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.loginButton} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
     loginButton: {
    backgroundColor: '#520000',
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 0,
  },
  loginButtonText: {
    color: '#FCFCF8',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '600',
  },
})