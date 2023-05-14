import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { HeroImage, Startlogo } from '../assets';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen'
import axios from 'axios';

const OpenScreen = () => {

    const local = "https://api.antygarb.pl"
    const [device, setDevice] = useState(false);

    var RNFS = require('react-native-fs');
    var path = RNFS.DocumentDirectoryPath + '/deviceT7.json';
    var dirpath = RNFS.DocumentDirectoryPath;

    if(device == false){
        RNFS.readDir(dirpath)
        .then((result) => {
            console.log('GOT RESULT', result);
            // stat the first file
            return Promise.all([RNFS.stat(path), path]);
        })
        .then((statResult) => {
            if (statResult[0].isFile()) {
                setDevice(true)
                console.log("true");

                RNFS.readFile(path)
                .then((success) => {
                    console.log('FILE READ!');
                    //console.log(success);
                    const data = JSON.parse(success)
                    CheckAccount(data)
                })

            }else{
            CreateD();
        }
        })
        .catch((err)=>{
            console.log(err)
            if(err == "Error: File does not exist"){
                CreateD();
                SplashScreen.hide()
            }
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
            console.log("error", err);
            SplashScreen.hide()
            
        })
    }

     const CreateD = () =>{   //Create device  ---- create token
        axios.get(local + "/api/v1/new-apiuser")
        .then((resp) => { 
            const client = {
                client_token: resp.data.client_token,
                client_uid: resp.data.client_uid,
              }
            const data = JSON.stringify(client)


             //const  Datadevice = {"client_token":resp.data.client_token}
            //"client_uid":"resp.data.client_uid"  "client_token":"",
            //console.log("setup");
            RNFS.writeFile(path, data, 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!', success);
            })
            .catch((err) => {
                console.log(err.message);
            });
        })

        
        
        
     }

     
    
    
    const handleclicklinking = ()=> {
        Linking.openURL('https://antygarb.pl')
    }
    const navigation = useNavigation();

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown : false,
        })
    },[])


   
  return (
    <SafeAreaView className="flex-1 bg-[#ECECEC] realtive">
        <View className="pt-6 px-6">
            <Text className="text-black text-[14px]" style={styles.fontText} >Antygarb</Text>
        </View>
        <View className="flex-1 relative items-center justify-center top-5">
            <Animatable.Image source={Startlogo} animation={"pulse"} easing={"ease-in-out"} iterationCount={"infinite"} className="w-[320px] h-[280px]"/>
        </View>
        <View className="mb-20">
            <TouchableOpacity onPress={()=> navigation.navigate("Connect")}>
                <LinearGradient start={{ x: 1, y: 0.5 }} end={{ x: 0, y: 0.5 }} colors={['#D5D5D6', '#B0CAF8' ]} className="h-[65px] mb-8 mx-12 rounded-full justify-center items-center">
                    <Text className="text-white text-[14px]" style={styles.fontText} >Connect to website account</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleclicklinking}>
                <View className=" h-[65px] border-2 mx-12 rounded-full justify-center items-center">
                    <Text className="text-black text-[12px]" style={styles.fontText} >Run the application on the website once</Text>
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
        fontText: {
        fontFamily: 'Poppins-Bold',
        },
        
    });

export default OpenScreen
