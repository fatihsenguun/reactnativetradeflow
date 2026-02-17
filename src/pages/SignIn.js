import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const { login,user } = useAuth();

  const BASE_URL = 'http://localhost:8080';

  const handleSingin = async () => {
    try {
      const url = `${BASE_URL}/authenticate`;

      setLoading(true);
      const response = await axios.post(url, {
        email: email,
        password: password
      });

      if (response.data.data) {

        console.log(response.data.data);
        login(response.data.data)


      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }





  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <Text style={styles.title}>WELCOME BACK</Text>
            <Text style={styles.subTitle}>SIGN IN TO YOUR ACCOUNT</Text>
          </View>

          <View style={styles.form}>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#ccc"
                secureTextEntry
              />
              <TouchableOpacity style={styles.forgotBtn}>
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSingin} style={styles.loginButton} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.replace('SignUp')}>
              <Text style={styles.registerText}>
                New here? <Text style={{ textDecorationLine: 'underline' }}>Create an account</Text>
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.guestText}>CONTINUE AS GUEST</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCF8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#1a1a1a',
    letterSpacing: 2,
    fontWeight: '400',
  },
  subTitle: {
    fontSize: 10,
    color: '#888',
    letterSpacing: 3,
    marginTop: 10,
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
  },
  label: {
    fontSize: 10,
    color: '#520000',
    letterSpacing: 1.5,
    marginBottom: 10,
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    color: '#1a1a1a',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    height: 40,
  },
  forgotBtn: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  forgotText: {
    fontSize: 11,
    color: '#999',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
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
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 12,
    color: '#555',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  guestText: {
    fontSize: 11,
    color: '#aaa',
    letterSpacing: 2,
    textDecorationLine: 'underline',
    textTransform: 'uppercase'
  }
})