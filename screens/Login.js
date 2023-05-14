import { View, Text, StyleSheet,Image , SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useLayoutEffect } from 'react'
import { arrowleft } from '../assets/icons'
import { useState } from 'react'
import axios from 'axios'




const Login = ({data, click}) => {
    const [user, setUser]=useState({password:'', errborder:'#C4C4C4'});
    const local = "https://api.antygarb.pl" 
    const handleChange=(e)=>{
        setUser({password: e});
    }

    const sendData = {
        email:data.email,
        password:user.password,
        client_token:data.client_token,
        client_uid:data.client_uid,
    }

    //console.log("data",data)

    if(click === true){
        console.log(sendData);
        log();
    }

    function log(){
        axios.post(local + "/api/v1/login",sendData)
        .then((resp)=>{
            if(resp.status === 200){
                console.log("succes")
                navigation.navigate("OpenDashboard");
            }
        })
        .catch((err)=>{
            console.log(err.response.status)
            if(err.response.status == 401){ // niepoprawne hasło
                setUser({errborder: '#E57373'})
            }
        })
    }
    

    const navigation = useNavigation();
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown : false,
        })
    },[])
    
    const handleclicklinking = ()=> {
        Linking.openURL('https://aiag.antygarb.pl/join')
    }

    const errorlayout = {
        borderColor: user.errborder,
    };
  return (
    <View className="justify-center items-center w-full">
        <View className="w-full">
            <View className="mt-12 mx-10 bg-white rounded-[28px]">
                <Text className="text-[20px] text-center mb-10 mt-4 text-black">Enter your password</Text>
                <TextInput secureTextEntry={true} placeholder='password' value={user.password} onChangeText={handleChange}  placeholderTextColor={'black'} style={[styles.fontTextR, errorlayout]} className="bg-white h-[55px] mx-8 mb-4 relative  ease-in-out duration-200 color-black border-[1px] rounded-full px-6 text-center text-[14px] pt-[14px]"></TextInput>
            </View>
        </View>
    </View> 
      
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

export default Login