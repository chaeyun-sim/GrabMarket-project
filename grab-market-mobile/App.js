import {useEffect, useState} from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import MainScreen from "./screens/main";
// import {NavigationContainer} from "@react-navigation/native"

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: 16,
    marginRight: 16,
  }
});
