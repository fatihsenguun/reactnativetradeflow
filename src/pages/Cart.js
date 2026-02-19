import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '../components/generalComponents/PageHeader'


const Cart = () => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} >
    <PageHeader subTitle={""} mainTitle={"CART"} />



        <Text>Cart</Text>


      </ScrollView>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCFCF8',
  },
  scroll: {
    backgroundColor: '#FCFCF8',
  },
  headerBox: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#FCFCF8',
  },
})