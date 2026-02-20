import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthProvider'
import PageHeader from '../components/generalComponents/PageHeader'

const Profile = () => {
  const navigation = useNavigation();
  
  const {user, userInfo,fetchUser, logout } = useAuth();

const userBalance = userInfo?.data?.wallet?.balance || 0;
console.log(userBalance);


useFocusEffect(
    useCallback(() => {
      // Eğer kullanıcı giriş yapmışsa, profili ve bakiyeyi arkadan sessizce güncelle
      if (user) {
        fetchUser(); 
      }
    }, [user])
  );


  if (user) {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          
          <PageHeader 
              subTitle={user.firstName ? `${user.firstName} ${user.lastName || ''}`.toUpperCase() : 'MEMBER'} 
              mainTitle={"MY ACCOUNT"} 
          />

          <View style={styles.container}>
            

            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
              <Text style={styles.balanceAmount}>
                  {userBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} TL
              </Text>
              <TouchableOpacity style={styles.addFundsBtn} activeOpacity={0.7}>
                <Text style={styles.addFundsText}>+ ADD FUNDS</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.menuContainer}>
              <TouchableOpacity 
                  style={styles.menuItem} 
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('MyOrders')} 
              >
                <Text style={styles.menuItemText}>MY ORDERS</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
                <Text style={styles.menuItemText}>ACCOUNT DETAILS</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
                <Text style={styles.menuItemText}>SAVED ADDRESSES</Text>
                <Text style={styles.menuItemArrow}>›</Text>
              </TouchableOpacity>
            </View>

          </View>
            <View style={styles.footer}>
            <TouchableOpacity onPress={() => logout()} style={styles.logoutButton} activeOpacity={0.8}>
              <Text style={styles.logoutButtonText}>SIGN OUT</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
              <Text style={styles.helpText}>Need assistance?</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
      
      </View>
    )
  }


  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <PageHeader subTitle={"PRIVATE ACCESS"} mainTitle={"MEMBERSHIP"} />

        <View style={styles.noUserContainer}>
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
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.helpText}>Need assistance?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCFCF8',
  },
  scroll: {
    backgroundColor: '#FCFCF8',
  },
  container: {
    paddingHorizontal: 25,
    paddingBottom: 50, // İçerik scroll edilirken altta boşluk kalsın
  },
  noUserContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 60,
  },
  balanceContainer: {
    alignItems: 'center',
    paddingVertical: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 10,
  },
  balanceLabel: {
    fontSize: 9,
    color: '#888',
    letterSpacing: 3,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#520000',
    letterSpacing: 1,
    marginBottom: 15,
  },
  addFundsBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  addFundsText: {
    fontSize: 9,
    color: '#1a1a1a',
    letterSpacing: 2,
    fontWeight: '600',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  menuItemText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#1a1a1a',
    letterSpacing: 2,
  },
  menuItemArrow: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '300',
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#666',
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
  },
  loginButtonText: {
    color: '#FCFCF8',
    fontSize: 11,
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
  },
  registerButtonText: {
    color: '#1a1a1a',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FCFCF8',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  logoutButton: {
    backgroundColor: '#520000',
    width: '85%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButtonText: {
    color: '#FCFCF8',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    letterSpacing: 1,
  }
})