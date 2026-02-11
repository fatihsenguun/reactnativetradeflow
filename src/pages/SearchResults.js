import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductBox from '../components/resultsComponents/ProductBox'

const SearchResults = ({ route }) => {

  const { data } = route.params;
  console.log(data);
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.row}>
          {data.map((product) => (
            <ProductBox key={product.id} product={product} />
          ))}



        </View>


      </View>
    </ScrollView>
  )
}

export default SearchResults

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white'
  },

  container: {
    marginHorizontal: 5,

  },
  product: {

    width: '45%',
    height: 270,
    marginTop: 35

  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  images: {
    width: '100%',
    height: 200,

  },

})