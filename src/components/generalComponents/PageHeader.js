import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PageHeader = ({subTitle, mainTitle, itemLength=""}) => {
    return (
        <View style={styles.headerBox}>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.mainTitle}>{mainTitle}</Text>
            <View style={styles.divider} />
            <Text style={styles.countText}>{itemLength+' ITEMS'} </Text>
        </View>
    )
}

export default PageHeader

const styles = StyleSheet.create({
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
})