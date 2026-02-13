import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Input = () => {
  return (
     <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
              />
  )
}

export default Input

const styles = StyleSheet.create({})