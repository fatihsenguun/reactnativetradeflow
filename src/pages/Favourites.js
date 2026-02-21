import { StyleSheet, Text, View, Platform, ActivityIndicator, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthProvider';
import { useFav } from '../context/FavoriteContext';
import ProductBox from '../components/resultsComponents/ProductBox';
import PageHeader from '../components/generalComponents/PageHeader'

const Favourites = () => {
  const navigation = useNavigation();
  const { user,userInfo } = useAuth();

  const { favorites = [], loading } = useFav();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!userInfo) {
        navigation.navigate('MainTabs', { screen: 'PROFILE' });
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 100);
      }
    });
    return unsubscribe;
  }, [navigation, user]);

  if (loading) {
    return (
      <View style={[styles.mainContainer, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#520000" />
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

      
        <PageHeader subTitle={'MEMBERSHIP'} mainTitle={'WISHLIST'} itemLenght={3}/>

        {favorites.length > 0 ? (
          <View style={styles.container}>
            <View style={styles.row}>
              {favorites.map((item) => (
                <ProductBox 
                    key={item.id || item.product.id} 
                    product={item.product} 
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.noProductContainer}>
            <Text style={styles.fadedIcon}>♥</Text>
            <Text style={styles.messageTitle}>PRIVATE COLLECTION</Text>
            <Text style={styles.messageDesc}>
              Save your favorite pieces.
            </Text>
          </View>
        )}

      </ScrollView>
    </View>
  )
}

export default Favourites;

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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadedIcon: {
    fontSize: 50,
    color: '#520000',
    opacity: 0.1,
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
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    marginBottom: 40,
  },
})