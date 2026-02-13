import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Search = () => {

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('GENTLEMEN'); 
  const [searchText, setSearchText] = useState('');

  const selectCategory = (genderTab, categoryId) => {

      let genderId = "";
      let headerTitle = "";

      if (genderTab === 'GENTLEMEN') {
          genderId = "08ad6bed-ac8d-4e20-b835-7b00d960bfea"; 
          headerTitle = "GENTLEMEN"; 
      } else {
          genderId = "ee671e9d-124c-4239-adf6-b46d5840e4a7"; 
          headerTitle = "LADIES";
      }

      navigation.navigate('SearchResults', { 
          categories: [genderId, categoryId], 
          header: headerTitle 
      });
  }


  const CATEGORIES = [
      { name: "READY TO WEAR", id: "4800fe74-fe7a-4b38-b0f8-6b38474906b8" },
      { name: "SHOES", id: "c8ed306c-6a52-4b68-9cd2-59659d90e933" },
      { name: "ACCESSORIES", id: "069dcdcc-7e3e-4dbb-9dbf-60c2b391bc7d" },
      { name: "ACTIVEWEAR", id: "6a06fa34-6126-48d4-b0a2-8af791eaf49e" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}></Text>
        
        <View style={styles.inputWrapper}>
            <Image source={require('../images/shopping-bag.png')} style={[styles.searchIcon, { tintColor: '#888' }]} /> 
            <TextInput 
                style={styles.input}
                placeholder="Search collection..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                selectionColor="#520000"
            />
        </View>
      </View>


      <View style={styles.tabContainer}>
        <TouchableOpacity 
            onPress={() => setActiveTab('LADIES')} 
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'LADIES' && styles.activeTabBorder]}
        >
            <Text style={[styles.tabText, activeTab === 'LADIES' ? styles.activeTabText : styles.inactiveTabText]}>
                LADIES
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => setActiveTab('GENTLEMEN')} 
            activeOpacity={0.8}
            style={[styles.tabButton, activeTab === 'GENTLEMEN' && styles.activeTabBorder]}
        >
            <Text style={[styles.tabText, activeTab === 'GENTLEMEN' ? styles.activeTabText : styles.inactiveTabText]}>
                GENTLEMEN
            </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        

        <View style={styles.categoryContainer}>

            
            {CATEGORIES.map((cat, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.categoryItem}
                    onPress={() => selectCategory(activeTab, cat.id)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.categoryText}>{cat.name}</Text>
                    <Text style={styles.arrowText}>→</Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* 4. TRENDLER */}
        <View style={styles.trendingSection}>
            <Text style={styles.sectionHeader}>TRENDING NOW</Text>
            <Text style={styles.trendingTag}>#SummerCollection</Text>
            <Text style={styles.trendingTag}>#Linen</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCF8',
  },

  // HEADER & INPUT
  headerContainer: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
  },
  pageTitle: {
      marginBottom: 20,
  },
  inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#1a1a1a',
      paddingBottom: 10,
  },
  searchIcon: {
      width: 18,
      height: 18,
      marginRight: 10,
      resizeMode: 'contain',
      opacity: 0.5
  },
  input: {
      flex: 1,
      fontSize: 16,
      fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
      color: '#1a1a1a',
      letterSpacing: 0.5,
      padding: 0,
  },

  // TABLAR (LADIES / GENTLEMEN)
  tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
  },
  tabButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 15,
  },
  activeTabBorder: {
      borderBottomWidth: 2,
      borderBottomColor: '#520000', // Bordo Çizgi
  },
  tabText: {
      fontSize: 13, // Biraz küçülttüm, Gentlemen uzun kelime olduğu için sığsın
      fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
      letterSpacing: 2,
      fontWeight: '600',
  },
  activeTabText: {
      color: '#520000',
  },
  inactiveTabText: {
      color: '#999',
  },

  // KATEGORİ LİSTESİ
  scrollView: {
      flex: 1,
  },
  categoryContainer: {
      padding: 30,
  },
  sectionHeader: {
      fontSize: 10,
      color: '#888',
      letterSpacing: 3,
      marginBottom: 25,
      fontWeight: '600',
  },
  categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: '#e0e0e0',
  },
  categoryText: {
      fontSize: 16,
      fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
      color: '#1a1a1a',
      letterSpacing: 1,
      fontWeight: '400',
  },
  arrowText: {
      fontSize: 18,
      color: '#ccc',
      fontWeight: '300',
  },


  trendingSection: {
      paddingHorizontal: 30,
      paddingBottom: 50,
  },
  trendingTag: {
      fontSize: 14,
      fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
      color: '#555',
      marginBottom: 10,
      fontStyle: 'italic',
  }
})