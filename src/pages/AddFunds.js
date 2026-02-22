import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthProvider'
import PageHeader from '../components/generalComponents/PageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import api from '../config/api'

const AddFunds = () => {
  const navigation = useNavigation();
  const { userInfo } = useAuth();


  const userBalance = userInfo?.data?.wallet?.balance || 0;

  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const presetAmounts = [1000, 5000, 10000];

  const handleAddFunds = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/rest/api/wallet/deposit", {
        amount: Number(amount)
      })
      if (response.data) {
        console.log(response);
        alert(`Successfully added ${Number(amount).toLocaleString()} TL to your wallet.`);
        navigation.goBack();
      }
    } catch (error) {
      console.log("Bakiye yükleme hatası:", error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          <PageHeader
            subTitle={"WALLET BALANCE"}
            mainTitle={"ADD FUNDS"}
          />

          <View style={styles.container}>


            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>CURRENT BALANCE</Text>
              <Text style={styles.balanceAmount}>
                {userBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })} TL
              </Text>
            </View>


            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>SELECT AMOUNT</Text>
              <View style={styles.presetRow}>
                {presetAmounts.map((preset) => (
                  <TouchableOpacity
                    key={preset}
                    style={[
                      styles.presetBtn,
                      Number(amount) === preset && styles.presetBtnActive
                    ]}
                    activeOpacity={0.7}
                    onPress={() => setAmount(preset.toString())}
                  >
                    <Text style={[
                      styles.presetBtnText,
                      Number(amount) === preset && styles.presetBtnTextActive
                    ]}>
                      {preset.toLocaleString()} TL
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>



            <View style={styles.inputContainer}>
              <Text style={styles.sectionTitle}>OR ENTER CUSTOM AMOUNT</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currencySymbol}>₺</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </View>
            </View>


            <TouchableOpacity
              style={styles.submitButton}
              activeOpacity={0.8}
              onPress={handleAddFunds}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? "PROCESSING..." : "PROCEED TO PAYMENT"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.secureText}>
              🔒 Secure encrypted transaction
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddFunds

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
    paddingBottom: 50,
  },

  // --- MEVCUT BAKİYE (Profile.js tarzı) ---
  balanceContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 9,
    color: '#888',
    letterSpacing: 3,
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 28,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#1a1a1a', // Tutar burada siyah, logolardaki bordo gibi lüks dursun diye
    letterSpacing: 1,
  },

  // --- SEÇİMLER ---
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 10,
    color: '#888',
    letterSpacing: 2,
    marginBottom: 15,
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingVertical: 15,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  presetBtnActive: {
    borderColor: '#1a1a1a',
    backgroundColor: '#1a1a1a',
  },
  presetBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    fontSize: 14,
    color: '#1a1a1a',
  },
  presetBtnTextActive: {
    color: '#FCFCF8',
  },

  // --- ÖZEL TUTAR GİRİŞİ ---
  inputContainer: {
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 10,
  },
  currencySymbol: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#1a1a1a',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 28,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#520000', // Girilen tutar bordo renkte görünsün
    paddingVertical: 0,
  },

  // --- BUTON VE ALT YAZI ---
  submitButton: {
    backgroundColor: '#520000',
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonText: {
    color: '#FCFCF8',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
  },
  secureText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#999',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    letterSpacing: 1,
    marginTop: 10,
  }
})