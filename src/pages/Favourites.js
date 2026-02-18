import { StyleSheet, Text, View, Platform, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthProvider';
import { useFav } from '../context/FavoriteContext';
import ProductBox from '../components/resultsComponents/ProductBox';

const Favourites = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { favorites = [], loading } = useFav();
  console.log(favorites);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!user) {
        navigation.navigate('MainTabs',{screen:'PROFILE'});
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
    <SafeAreaView style={styles.mainContainer}>

      <View style={styles.headerBox}>
        <Text style={styles.subTitle}>MEMBERSHIP</Text>
        <Text style={styles.mainTitle}>WISHLIST</Text>
        <View style={styles.divider} />
        <Text style={styles.countText}>{favorites.length} ITEMS</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.fadedIcon}>♥</Text>
          <Text style={styles.messageTitle}>PRIVATE COLLECTION</Text>
          <Text style={styles.messageDesc}>
            Save your favorite pieces.
          </Text>
        </View>
      ) : (

        <FlatList
          data={favorites}

          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 15 }}
          renderItem={({ item }) => (
            <View style={{ width: '48%', marginBottom: 15 }}>

              <ProductBox product={item.product} />
            </View>
          )}
        />
        
      )}
    </SafeAreaView>
  )
}

export default Favourites;

// Styles aynı kalabilir...
const styles = StyleSheet.create({
  // ... senin styles kodların ...
  mainContainer: {
    flex: 1,
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingBottom: 100,
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