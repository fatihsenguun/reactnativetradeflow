import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        

        <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
        >

          <Text style={styles.backIcon}>{'<'}</Text> 
        </TouchableOpacity>


        <Text style={styles.title}>{title}</Text>


        <View style={styles.placeholder} />
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    fontSize: 30,
    color: '#520000', 
    fontWeight: '300',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase', 
  },
  placeholder: {
    width: 40, //
  }
});

export default CustomHeader;