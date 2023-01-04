import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from "react";
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import Avatar from '../assets/icons/avatar.png';
import {API_URL} from '../config/constants';
import axios from "axios";
import React from 'react';
import Carousel from "react-native-snap-carousel";
// import Carousel from "react-native-walkthrough-carousel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko'

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function MainScreen() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((result) => {
      // console.log(result);clear
      console.log(result)
      setProducts(result.data.products);
    }).catch((err) => {
      console.error(err)
    });

    axios.get(`${API_URL}/banners`).then((result) => {
      setBanners(result.data.banners);
    }).catch((err) => {
      console.error(err);
    })
  });

  return (
      <View style={styles.container}>
        <ScrollView>
          <Carousel
            data={banners}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            itemHeight={200}
            renderItem={(object) => {
              return (
                <TouchableOpacity onPress={() => {
                  Alert.alert('배너 클릭')
                }}>
                  <Image
                    source={{
                      uri: `${API_URL}/${object.item.imageUrl}`
                    }}
                    style={styles.bannerImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
            }}
          />
          
          {/* <Image source={`${API_URL}/${banners.imageUrl}`} style={styles.bannerImage} resizeMode="contain" /> */}
          
          <Text style={styles.headline}>판매되는 상품들</Text>
          <View style={styles.productList}>
          {
            products.map((items, index) => {
              console.log(items)
              return (
                <View style={styles.productCard} key={index}>
                  {
                    items.soldout === 1 && <View style={styles.productBlur} />
                  }
                  <View>
                    <Image source={{
                      uri: `${API_URL}/${items.imageUrl}`
                    }} style={styles.productImage} resizeMode={"contain"} />
                  </View>
                  <View style={styles.productContents}>
                    <Text style={styles.productName}>{items.name}</Text>
                    <Text style={styles.productPrice}>{items.price}원</Text>
                    <View style={styles.productFooter}>
                      <View style={styles.productSeller}>
                        <Image style={styles.productAvatar} source={Avatar} />
                        <Text style={styles.productSellerName}>{items.seller}</Text>
                      </View>
                      <Text style={styles.productDate}>{dayjs(items.createdAt).fromNow()}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32
  },
  productCard: {
    width: 320,
    borderColor: 'rgb(230, 230, 230)',
    border: 'solid',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  productImage : {
    width: '100%',
    height: 210,
  },
  productContents : {
    padding: 8,
  },
  productSeller : {
    flexDirection: 'row',
    alignItems: "center",
  },
  productAvatar : {
    width: 24,
    height: 24,
  },
  productFooter : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8
  },
  productSellerName : {
    fontSize: 16
  },
  productDate: {
    fontSize: 16,
  },
  productList : {
    alignItems: 'center',
  },
  headline: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
  },
  productBlur : {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffffaa',
    zIndex: 1,
  },
  bannerImage : {
    width: '100%',
    height: 200,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 16,
    marginRight: 16,
  }
});
