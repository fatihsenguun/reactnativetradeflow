import { StyleSheet, Text, View, Platform, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Favourites = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      
      {/* 1. HEADER (SearchResults ile Birebir Aynı Stil) */}
      <View style={styles.headerBox}>
        <Text style={styles.subTitle}>MEMBERSHIP</Text>
        <Text style={styles.mainTitle}>WISHLIST</Text>
        <View style={styles.divider} />
        <Text style={styles.countText}>0 ITEMS</Text>
      </View>

      {/* 2. İÇERİK (Boş Durum) */}
      <View style={styles.centerContainer}>
        
        {/* Çok hafif, flu bir ikon */}
        <Text style={styles.fadedIcon}>♥</Text>

        <Text style={styles.messageTitle}>PRIVATE COLLECTION</Text>
        
        <Text style={styles.messageDesc}>
          Sign in to curate your personal wardrobe and save your favorite pieces.
        </Text>

        {/* Buton yerine zarif bir yazı linki */}
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('PROFILE')}
          style={styles.textLinkContainer}
        >
          <Text style={styles.textLink}>GO TO PROFILE</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCFCF8',
  },

  // --- HEADER STİLLERİ (SearchResults'tan alındı) ---
  headerBox: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FCFCF8',
  },
  subTitle: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 4,
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: 36,
    color: "#520000", // Bordo
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    letterSpacing: 1,
    fontWeight: '400',
    marginBottom: 15,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: '#1a1a1a',
    marginBottom: 15,
  },
  countText: {
    fontSize: 12,
    color: '#666',
    letterSpacing: 1,
    fontWeight: '400',
  },

  // --- ORTA ALAN ---
  centerContainer: {
    flex: 1,
    justifyContent: 'center', // Dikey ortalama
    alignItems: 'center',     // Yatay ortalama
    paddingHorizontal: 50,
    paddingBottom: 100, // Header'dan pay kalsın diye biraz yukarı ittik
  },
  
  fadedIcon: {
    fontSize: 50,
    color: '#520000',
    opacity: 0.1, // Çok silik, filigran gibi
    marginBottom: 20,
  },
  
  messageTitle: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#1a1a1a',
    letterSpacing: 1.5,
    marginBottom: 10,
    textAlign: 'center',
  },
  
  messageDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24, // Satır aralığı geniş, rahat okunsun
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    marginBottom: 40,
  },

  // --- ZARİF LİNK ---
  textLinkContainer: {
    borderBottomWidth: 1, // Altı çizili
    borderBottomColor: '#1a1a1a',
    paddingBottom: 2,
  },
  textLink: {
    fontSize: 12,
    color: '#1a1a1a',
    letterSpacing: 2,
    fontWeight: '500',
  }
})