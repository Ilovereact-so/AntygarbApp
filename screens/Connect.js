import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { arrowleft } from '../assets/icons';
import axios from 'axios';
import Login from './Login';


const Connect = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(false);
    const [token, setToken] = useState("");
    const [inputcolor, setInputcolor] = useState("#000000");
    const [border,setBorder] = useState(0);
    const [load, setLoad] = useState(false);
    const [next, setNext] = useState(false);
    const sendData = {
        //first_name:"first_name2",
        //last_name:"last_name2",
        //password:"datapassword2",
        email:email,
        client_token:token.client_token,
        client_uid:token.client_uid
    }
    //console.log(data)
    const local = "https://api.antygarb.pl" 
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown : false,
        })
    },[])

    const handleclicklinking = ()=> {
        Linking.openURL('https://aiag.antygarb.pl/join')
    }
    if(token === ""){
        var RNFS = require('react-native-fs');
        var path = RNFS.DocumentDirectoryPath + '/deviceT7.json';
        RNFS.readFile(path)
        .then((success) => {
            console.log('FILE READ!');
            console.log(success);
            const data = JSON.parse(success)
            setToken(data)
            CheckAccount(data)
        })
    }
    
    
    function CheckAccount(e){
        axios.post(local + "/api/v1/account-details", e)
        .then((resp) => {
            console.log(resp.status)
            if(resp.status == 200){ //sprawdzanie czy uzytkownik jest zalogowany
                navigation.navigate("OpenDashboard")
            }
        })
        .catch((err)=>{
            console.log("error", err)
            
        })
    }
    function Logout(e){         // testowy logaut
        axios.post(local + "/api/v1/logout", e)
        .then((resp) => {
            console.log(resp)
        })
    }

    const handleclicknext = () => {
        if(email !== false){
            console.log(sendData)
            axios.post(local + "/api/v1/create-account",sendData)
            .then((resp)=>{
                console.log("resp status",resp.status);
                console.log("resp",resp);
            })
            .catch((err) => { 
                if(err.response.status == 409){
                    console.log(err.response.status);
                    //navigation.navigate("Login");
                    setLoad(true)
                }else{
                    console.log(err.response.status);
                }
            });
        }else{
            console.log("huj");
            setBorder(2)
            
        }
        
    }

    const onchangeinput = (text) =>{
        setBorder(0)
        //console.log(text)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            setInputcolor("#E53935");
            setEmail(false);
           
          }
        else {
            console.log("Email is Correct");
            setInputcolor("#000000");
            setEmail(text)
        }
    }

    const colorStyles = {
        color : inputcolor,
    };
    var borderStyle ={
        borderWidth: border,
    };
   if(load == false){
    return(
        <SafeAreaView className="flex-1 bg-[#ECECEC] realtive">
            <View className="pt-6 px-6">
                <Text className="text-black text-[14px]" style={styles.fontText} >Antygarb</Text>
            </View>
            <View className="flex-1 justify-center">
                <View className="justify-center items-center">
                    <Text className="text-black text-[20px]">Enter your e-mail address</Text>
                    <View className="w-full mt-10">
                        <TextInput placeholder='johnwick@google.com' value={email} onChangeText={onchangeinput} placeholderTextColor={'black'} style={[styles.fontTextR, colorStyles, borderStyle]} className="bg-white h-[65px] relative mx-10 ease-in-out duration-200 border-red-300 rounded-full px-6 text-center text-[14px] pt-[14px]"></TextInput>
                    </View>
                </View>
                <View className="flex-row mx-[65px] items-center justify-between my-6">
                    <TouchableOpacity onPress={()=> navigation.navigate("OpenScreen")}>
                        <View className="flex-row items-center">
                            <Image className="text-black mr-2" source={arrowleft}></Image><Text style={styles.fontText} className="text-black text-[14px]">Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleclicknext}>
                        <View className="flex-row items-center">
                            <Text style={styles.fontText} className="text-black text-[14px]">Next</Text><Image className="text-black ml-2 rotate-180" source={arrowleft}></Image>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity className="justify-center items-center mb-4" onPress={handleclicklinking}>
                <Text style={styles.fontText} className="text-[#7006FE] text-[12px]">If you don't have an account, create one here</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
   }else{
    return (
        <SafeAreaView className="flex-1 bg-[#ECECEC] realtive">
            <View className="pt-6 px-6">
                <Text className="text-black text-[14px]" style={styles.fontText} >Antygarb</Text>
            </View>
            <View className="flex-1 justify-center">
                <Login data={sendData} click={next} />
                <View className="flex-row mx-[65px] items-center justify-between my-6">
                    <TouchableOpacity onPress={()=> setLoad(false)}>
                        <View className="flex-row items-center">
                            <Image className="text-black mr-2" source={arrowleft}></Image><Text style={styles.fontText} className="text-black text-[14px]">Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={()=> setNext(true)} onPressOut={()=> setNext(false)}>
                        <View className="flex-row items-center">
                            <Text style={styles.fontText} className="text-black text-[14px]">Next</Text><Image className="text-black ml-2 rotate-180" source={arrowleft}></Image>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity className="justify-center items-center mb-4">
                <Text style={styles.fontText} className="text-[#EED9BD] text-[14px]">{email}</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    )
   }
  
}

const styles = StyleSheet.create({
    fontText: {
    fontFamily: 'Poppins-Bold',
    },
    fontTextR: {
        fontFamily: 'Poppins-Regular',
    },
    
});

export default Connect