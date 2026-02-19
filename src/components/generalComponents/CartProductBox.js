import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'

const CartProductBox = ({ item, onRemove }) => {
  const{product,quantity} = item;
  

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.images[0].imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </View>


      <View style={styles.detailsContainer}>
        

        <View>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.price}>
            {product.price} TL
          </Text>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.qtyBox}>
            <Text style={styles.quantity}>QTY: {quantity}</Text>
          </View>
          
          <TouchableOpacity onPress={onRemove} activeOpacity={0.6} style={styles.removeBtn}>
            <Text style={styles.removeText}>REMOVE</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default CartProductBox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Yatay dizilim için en kritik kod
    width: '100%',
    backgroundColor: '#FCFCF8',
    marginBottom: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EAEAEA', // Altına ince zarif bir çizgi
    paddingBottom: 20,
  },
  imageContainer: {
    width: 100, // Resmin genişliği sabit
    height: 140, // Resmin boyu uzun (lüks hissiyatı)
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1, // Kalan tüm sağ boşluğu doldur
    marginLeft: 18, // Resimle yazı arasındaki boşluk
    justifyContent: 'space-between', // İsim üstte, butonlar en altta kalsın
    paddingVertical: 5,
  },
  productName: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    color: '#1a1a1a',
    letterSpacing: 2,
    lineHeight: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
    color: '#520000',
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  qtyBox: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  quantity: {
    fontSize: 10,
    color: '#1a1a1a',
    letterSpacing: 2,
    fontWeight: '500',
  },
  removeBtn: {
    paddingBottom: 5,
  },
  removeText: {
    fontSize: 10,
    color: '#888',
    letterSpacing: 1.5,
    textDecorationLine: 'underline',
  }
})