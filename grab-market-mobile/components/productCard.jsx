import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Avatar from '../assets/icons/avatar.png';
import {API_URL} from '../config/constants';

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko'

dayjs.extend(relativeTime);
dayjs.locale('ko');


const ProductCard = (props) => {
    const items = props.items;

    return (
        <TouchableOpacity onPress={ () => {
            props.navigation.navigate("Product", {
              id: items.id,
            })
          }}>
            <View style={styles.productCard} key={product.id}>
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
        </TouchableOpacity>
    )
};

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
      marginLeft: 16,
      marginRight: 16,
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
      margin: 0,
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: "#fff",
      marginLeft: 16,
      marginRight: 16,
    }
});
  

export default ProductCard;