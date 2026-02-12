import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { act, useState } from 'react'
import qs from 'qs'
import axios from 'axios'
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native'

const Search = () => {

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('MEN')


  const selectCategory = async (active, section) => {
      let id = ""
      if (active === 'MEN') {
        id = "08ad6bed-ac8d-4e20-b835-7b00d960bfea"
      } else {
        id = "ee671e9d-124c-4239-adf6-b46d5840e4a7"
      }

        navigation.navigate('SearchResults', { categories:[id,section], header:active })

  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.box}>
          <TextInput style={styles.input}>

          </TextInput>

        </View>
        <View style={styles.category}>

          <View style={[styles.categoryHeader]}>


            <TouchableOpacity onPress={() => setActiveTab('MEN')} style={[styles.headerBox, activeTab === 'MEN' && styles.activeTab]}>
              <Text style={[styles.headerText, activeTab === 'MEN' && styles.activeText]}>MEN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab('WOMEN')} style={[styles.headerBox, activeTab === 'WOMEN' && styles.activeTab]}>
              <Text style={[styles.headerText, activeTab === 'WOMEN' && styles.activeText]}>WOMEN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryBody}>

            <TouchableOpacity onPress={() => selectCategory(activeTab, "4800fe74-fe7a-4b38-b0f8-6b38474906b8")}>
              <Text style={styles.categoryText}>
                CLOTHES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory(activeTab, "069dcdcc-7e3e-4dbb-9dbf-60c2b391bc7d")} >
              <Text style={styles.categoryText}>
                ACCECORIES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory(activeTab, "c8ed306c-6a52-4b68-9cd2-59659d90e933")} >
              <Text style={styles.categoryText}>
                SHOES
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory(activeTab, "6a06fa34-6126-48d4-b0a2-8af791eaf49e")} >
              <Text style={styles.categoryText}>
                SPORT
              </Text>
            </TouchableOpacity>


          </View>



        </View>
      </ScrollView>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
       backgroundColor: '#FCFCF8',
    alignItems: 'center',
    justifyContent: 'center',

  },

  scrollView: {

    width: '100%',

  },

  box: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',

    justifyContent: 'center',


  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#e2dddd',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 15

  },
  category: {
    width: "100%",
    minHeight: 500,
    marginTop: '20',
    alignItems: 'center'
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minWidth: '45%',
    height: 40,


  },
  headerText: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    fontWeight: '400',
    letterSpacing: 2,
  },
  categoryBody: {
    width: '90%',
    minHeight: 200,

  },
  categoryText: {
    marginTop: 30,
    fontSize: 19,
      fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif', 
        fontWeight: '400', 

  },
  activeTab: {
    borderBottomColor: "#520000",
    borderBottomWidth: 1,
    width: ''


  },
  activeText: {
    color: "#520000",
    fontWeight: '600'
  }
})