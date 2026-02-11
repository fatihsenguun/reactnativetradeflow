import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Search = () => {

  const [activeTab, setActiveTab] = useState('MEN')

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
              <Text style={styles.headerText}>MEN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab('WOMEN')} style={[styles.headerBox, activeTab === 'WOMEN' && styles.activeTab]}>
              <Text style={styles.headerText}>WOMEN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryBody}>
            <TouchableOpacity>
              <Text style={styles.categoryText}>
                Clothes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>
                Accecories
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>
                Shoes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.categoryText}>
                Sport
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
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
    fontSize: 18,
    fontWeight: '500'
  },
  categoryBody: {
    width: '90%',
    minHeight: 200,

  },
  categoryText: {
    marginTop: 30,
    fontSize: 18,

  },
  activeTab: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: ''


  }
})