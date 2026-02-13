import { Image, ScrollView, StyleSheet, Text, View, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductBox from '../components/resultsComponents/ProductBox'
import axios from 'axios';
import qs from 'qs'

const SearchResults = ({ route }) => {
  const { categories, header } = route.params || {};

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/rest/api/product/filter';

      setIsLoading(true);
      const response = await axios.get(url, {
        params: {
          categories: categories,
          page: 0,
          size: 10,
          sort: 'price,asc'
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      });

      if (response.data && response.data.data) {
        setProducts(response.data.data.content || response.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.headerBox}>
          <Text style={styles.subTitle}>CATALOGUE</Text>
          <Text style={styles.mainTitle}>{header ? header.toUpperCase() : 'COLLECTION'}</Text>
          <View style={styles.divider} />
          <Text style={styles.countText}>{products.length} ITEMS</Text>
        </View>

        {products.length > 0 ? (
          <View style={styles.container}>
            <View style={styles.row}>
              {products.map((product) => (
                <ProductBox key={product.id} product={product} />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.noProductContainer}>
            <Text style={styles.noProductTitle}>NO MATCHES FOUND</Text>
            <Text style={styles.noProductDesc}>Please try different filters.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FCFCF8',
  },
  scroll: {
    backgroundColor: '#FCFCF8',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#FCFCF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    color: "#520000",
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
  container: {
    marginHorizontal: 10,
    paddingBottom: 50,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  noProductContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductTitle: {
    fontSize: 20,
    color: '#1a1a1a',
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',

  },
  noProductDesc: {
    fontSize: 14,
    color: '#888',
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
  }
})