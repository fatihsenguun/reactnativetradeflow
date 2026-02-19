import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../config/api'
import PageHeader from '../components/generalComponents/PageHeader'
import { useFocusEffect } from '@react-navigation/native'
import ProductBox from '../components/resultsComponents/ProductBox'

const Cart = () => {
  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyCart = async () => {
    try {
      const url = '/rest/api/cart';

      setIsLoading(true);
      const response = await api.get(url);

      if (response.data && response.data.data) {
        console.log(response.data.data.items);
        setProducts(response.data.data.items);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMyCart();
  }, [])

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} >
        <PageHeader subTitle={""} mainTitle={"CART"} itemLength={product.length} />
        {product.length > 0 ? (
          <View style={styles.container}>
            
            {/* SENİN KUSURSUZ ÜRÜN YAPIN - HİÇ DOKUNULMADI */}
            <View style={styles.row}>
              {product.map((item) => (
                <ProductBox
                  key={item.id || item.product.id}
                  product={item.product}
                />
              ))}
            </View>
            {/* ROW BURADA BİTTİ */}

            {/* FOOTER ROW'UN DIŞINA ÇIKARILDI */}
            <View style={styles.footer}>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalAmount}>
                  {product.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0).toLocaleString()} TL
                </Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
                <Text style={styles.checkoutBtnText}>PROCEED TO CHECKOUT</Text>
              </TouchableOpacity>
            </View>

          </View>
        ) : (
          /* BOŞ SEPET DURUMU GÜNCELLENDİ */
          <View style={styles.noProductContainer}>
            <Text style={styles.messageTitle}>YOUR CART IS EMPTY</Text>
            <Text style={styles.messageDesc}>
              Discover our latest collections and find your next favorite piece.
            </Text>
            <TouchableOpacity style={styles.continueBtn} activeOpacity={0.8}>
                <Text style={styles.continueBtnText}>CONTINUE SHOPPING</Text>
            </TouchableOpacity>
          </View>
        )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    marginBottom: 40,
  },
  continueBtn: {
    borderWidth: 1,
    borderColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  continueBtnText: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  footer: {
    marginTop: 20,
    width: '100%', // Footer'ın ekranı kaplaması için eklendi
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  totalLabel: {
    fontSize: 12,
    letterSpacing: 2,
    color: '#1a1a1a',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#520000',
  },
  checkoutBtn: {
    backgroundColor: '#520000',
    paddingVertical: 18,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#FCFCF8',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '600',
  },
})