import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthProvider'

const Profile = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MY ACCOUNT</Text>
          <Text style={styles.subTitle}>
            {user.firstName ? user.firstName.toUpperCase() : 'MEMBER'}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            You are currently signed in. {"\n"}
            Manage your personal details and orders.
          </Text>

          <TouchableOpacity onPress={() => logout()} style={styles.loginButton} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.helpText}>Need assistance?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MEMBERSHIP</Text>
        <Text style={styles.subTitle}>PRIVATE ACCESS</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome to the inner circle. {"\n"}
          Sign in to access your curated wardrobe.
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.loginButton} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.registerButton} activeOpacity={0.7}>
          <Text style={styles.registerButtonText}>BECOME A MEMBER</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.helpText}>Need assistance?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCF8',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#1a1a1a',
    letterSpacing: 3,
    fontWeight: '400',
  },
  subTitle: {
    fontSize: 10,
    color: '#888',
    letterSpacing: 4,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  loginButton: {
    backgroundColor: '#520000',
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 0,
  },
  loginButtonText: {
    color: '#FCFCF8',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1a1a1a',
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 0,
  },
  registerButtonText: {
    color: '#1a1a1a',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  }
})