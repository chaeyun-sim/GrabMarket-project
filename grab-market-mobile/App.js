import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import MainScreen from "./screens/main";
import ProductScreen from "./screens/product";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{
            title: "홈 화면"
          }} />
          <Stack.Screen name="Product" component={ProductScreen} options={{
            title: "상품 상세 화면"
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
