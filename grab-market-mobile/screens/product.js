import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, ScrollView, StyleSheet, Image, View, Alert, TouchableOpacity } from "react-native";
import { API_URL } from "../config/constants";
import Avatar from "../assets/icons/avatar.png"
import dayjs from "dayjs";
import ProductCard from "../components/productCard";

export default function ProductScreen(props){
    const {id} = props.route.params;
    const [products, setProducts] = useState(null);
    const [productList, setProductList] = useState([]);
    // console.log(id)

    useEffect(() => {
        axios.get(`${API_URL}/products/${id}`).then((result) => {
            // console.log('Result', result.data.product)
            setProducts(result.data.product);
        }).catch((err) => {
            console.error(err);
        });

        axios.get(`${API_URL}/products/${id}/recommendation`).then((result) => {
            // console.log("product list : ", result.data.products)
            setProductList(result.data.products)
        }).catch((err) => {
            console.error(err);
        })
    }, [id]);

    const onPressButton = () => {
        if (!products.soldout){
            Alert.alert('구매가 완료되었습니다.')
        }
    };

    if (!products){
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Image source={{
                        uri: `${API_URL}/${products.imageUrl}`
                    }} style={styles.productImage} resizeMode="contain" />
                </View>
                <View style={styles.productSection}>
                    <View style={styles.between}>
                        <View style={styles.productSeller}> 
                            <Image source={Avatar} style={styles.avatarImage} />
                            <Text>{products.seller}</Text>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.productDate}>{dayjs(products.createdAt).format('YYYY년 MM월 DD일')}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.productName}>{products.name}</Text>
                        <Text style={styles.productPrice}>{products.price}</Text>
                        <Text style={styles.productDesc}>{products.description}</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.recommendationHeader}>추천 상품</Text>
                    <View style={styles.recommendation}>
                        {
                            productList.map((product, index) => {
                                return (
                                    <ProductCard items={product} key={index} navigation={props.navigation}/>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={onPressButton}>
                <View style={products.soldout === 1 ? styles.soldout : styles.purchaseButton}>
                    <Text style={styles.purchaseText}>{products.soldout === 1 ? '품절' : '구매하기'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : "white"
    },
    productImage : {
        width: '100%',
        height: 300,
    },
    avatarImage : {
        width: 50,
        height: 50,
    },
    productSeller : {
        flexDirection: "row",
        alignItems: "center",
    },
    productSection : {
        padding: 8,
    },
    divider : {
        backgroundColor: "#e9ecef",
        height: 1,
        marginVertical: 16,
    },
    productName: {
        fontSize: 20,
        fontWeight: '400',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 8
    },
    productDate: {
        fontSize: 14,
        marginTop: 4,
        color: 'rgb(204, 204, 204)',
    },
    productDesc : {
        marginTop: 16,
        fontSize: 17,
        marginBottom: 32,
    },
    purchaseButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'rgb(250, 80, 88)',
        alignItems: "center",
        justifyContent: "center"
    },
    purchaseText : {
        color: "white",
        fontSize: 20,
        fontWeight: '500',
    },
    soldout: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'gray',
        alignItems: "center",
        justifyContent: "center"
    },
    between : {
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1,
    },
    textView : {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
    },
    recommendation: {
        alignItems: 'center',
        marginTop: 16,
        paddingBottom: 70,
        // width: '80%'
    },
    recommendationHeader : {
        fontSize: 30,
    }
})