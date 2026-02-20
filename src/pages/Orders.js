import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import PageHeader from '../components/generalComponents/PageHeader'
import api from '../config/api'

const Orders = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [])
    );

    const fetchOrders = async () => {
        try {

            const url = `/rest/api/order/my-orders`; 
            setIsLoading(true);
            const response = await api.get(url);


            if (response.data && response.data.data) {
                console.log("Gelen Siparişler:", response.data.data);
                setOrders(response.data.data);
            }
        } catch (error) {
            console.log("Sipariş çekme hatası:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                <PageHeader
                    subTitle={"ORDER HISTORY"}
                    mainTitle={"MY ORDERS"}
                />

                <View style={styles.container}>

                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <TouchableOpacity
                                key={order.id}
                                style={styles.orderCard}
                                activeOpacity={0.7}
                            >

                                <View style={styles.rowBetween}>
                                    <Text style={styles.orderNumber}>{order.orderNumber || 'PENDING'}</Text>
                                    <Text style={[
                                        styles.orderStatus,
                                        { color: order.status === 'APPROVED' || order.status === 'PROCESSING' ? '#520000' : '#888' }
                                    ]}>
                                        {order.status}
                                    </Text>
                                </View>


                                <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>

                                <View style={styles.rowBetweenBottom}>
                                    <View>
                                        <Text style={styles.itemCount}>
                                         {order.orderItemList?.length || 0} {(order.orderItemList?.length || 0) > 1 ? 'ITEMS' : 'ITEM'}
                                        </Text>
                                        <Text style={styles.totalAmount}>
                                            {order.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })} TL
                                        </Text>
                                    </View>
                                    <Text style={styles.arrowIcon}>›</Text>
                                </View>

                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyTitle}>NO RECENT ORDERS</Text>
                            <Text style={styles.emptyDesc}>
                                You haven't placed any orders yet. {"\n"}
                                Discover our collections to find your next signature piece.
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.shopBtn} activeOpacity={0.8}>
                                <Text style={styles.shopBtnText}>CONTINUE SHOPPING</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>

            </ScrollView>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#FCFCF8',
    },
    scroll: {
        backgroundColor: '#FCFCF8',
    },
    container: {
        paddingHorizontal: 25,
        paddingBottom: 50,
        marginTop: 10,
    },
    orderCard: {
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderNumber: {
        fontSize: 12,
        color: '#1a1a1a',
        letterSpacing: 2,
        fontWeight: '600',
    },
    orderStatus: {
        fontSize: 9,
        letterSpacing: 2,
        fontWeight: '600',
    },
    orderDate: {
        fontSize: 12,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 15,
    },
    rowBetweenBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    itemCount: {
        fontSize: 9,
        color: '#888',
        letterSpacing: 2,
        marginBottom: 5,
    },
    totalAmount: {
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? 'Didot' : 'serif',
        color: '#1a1a1a',
        letterSpacing: 1,
    },
    arrowIcon: {
        fontSize: 22,
        color: '#ccc',
        fontWeight: '300',
        paddingBottom: 2,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyTitle: {
        fontSize: 14,
        color: '#1a1a1a',
        letterSpacing: 3,
        marginBottom: 15,
    },
    emptyDesc: {
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    shopBtn: {
        borderWidth: 1,
        borderColor: '#1a1a1a',
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    shopBtnText: {
        color: '#1a1a1a',
        fontSize: 10,
        letterSpacing: 2,
        fontWeight: '600',
    }
})