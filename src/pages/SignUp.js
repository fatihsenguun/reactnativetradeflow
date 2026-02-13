import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/generalComponents/Button' 

const SignUp = () => {
  const navigation = useNavigation();
  

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log("Kayıt olunuyor...", name, surname);

  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          

          <View style={styles.header}>
            <Text style={styles.title}>JOIN THE CLUB</Text>
            <Text style={styles.subTitle}>CREATE YOUR PERSONAL ACCOUNT</Text>
          </View>


          <View style={styles.form}>
            

            <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.label}>FIRST NAME</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="John"
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.label}>LAST NAME</Text>
                    <TextInput
                        style={styles.input}
                        value={surname}
                        onChangeText={setSurname}
                        placeholder="Doe"
                        placeholderTextColor="#ccc"
                    />
                </View>
            </View>


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
            </View>


            <Button text="BECOME A MEMBER" onPress={handleSignUp} />


            <TouchableOpacity style={styles.loginLink} onPress={() => navigation.replace('SignIn')}> 
                <Text style={styles.loginText}>
                    Already a member? <Text style={{textDecorationLine: 'underline'}}>Sign In</Text>
                </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCF8', 
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },


  header: {
    alignItems: 'center',
    marginBottom: 40,
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

  // --- FORM ---
  form: {
    width: '100%',
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  inputContainer: {
    marginBottom: 25,
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


  loginLink: {
      alignItems: 'center',
      marginTop: 10
  },
  loginText: {
      fontSize: 12,
      color: '#555',
      fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  },
})