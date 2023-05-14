import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import SplashScreen from 'react-native-splash-screen'


const OpenDashboard = () => {

    const [user, setUser] = useState({
        client_token:'',
        client_uid:'',
        email:'',
        first_name:''
    });
    const sendData = {
        client_token:user.client_token,
        client_uid:user.client_uid,
    }

    const local = "https://api.antygarb.pl" 
    const navigation = useNavigation();
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown : false,
        })
    },[])

    if(user.client_token === ""){
        var RNFS = require('react-native-fs');
        var path = RNFS.DocumentDirectoryPath + '/deviceT7.json';
        RNFS.readFile(path)
        .then((success) => {
            console.log('FILE READ!');
            console.log(success);
            const data = JSON.parse(success)
            setUser({client_token:data.client_token, client_uid:data.client_uid})
        })
    }
    if(sendData.client_token !== ""){
        axios.post(local + "/api/v1/account-details", sendData)
        .then((resp) => {
            console.log(resp.data.first_name)
            setUser({first_name:resp.data.first_name})
        })
        .catch((err)=>{
            console.log("error", err)
        })
    }
    
    useEffect(() => SplashScreen.hide());



  return (
    <SafeAreaView className="relative bg-white">
        <View className="flex-1 justify-center items-center h-full">
            <Text style={styles.fontText} className="text-[#7006FE] text-[20px]">Hello</Text>
            <Text style={styles.fontTextR} className="text-black text-[20px]">{user.first_name}</Text>
        </View>
        <View className="absolute bottom-2 w-full items-center ">
            <Text style={styles.fontTextR} className="text-black">@antygarb | antygarb.pl</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    fontText: {
    fontFamily: 'Poppins-Bold',
    },
    fontTextR: {
        fontFamily: 'Poppins-Regular',
    },
    
});

export default OpenDashboard