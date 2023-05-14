import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Attractions, Avatar, Hotels, Restaurants } from '../assets';
import { Image } from 'react-native-animatable';
import MenuContainer from './MenuContainer';

const Discover = () => {

    const navigation = useNavigation();
    const [Type, setType] = useState("restaurants")
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown : false,
        })
    },[])

  return (
    <SafeAreaView className="flex-1 realtive bg-white pt-4">
      <View className="flex-row items-center justify-between px-8">
        <View>
            <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
            <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>
        
        <View className="w-12 h-12 rounded-md items-center bg-gray-400 justify-center shadow-gray-400 shadow-lg">
            <Image
              source={Avatar}
              className="w-full h-full rounded-md object-cover"
            />
        </View>
      </View>
      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg shadow-gray-400 mt-4">
        <TextInput placeholder='Search'></TextInput>
      </View>
      
      {/**Menu Container */}
        <ScrollView>
            <View className="flex-row items-center justify-evenly">
                <MenuContainer
                  key={"hotel"}
                  title="Hotels"
                  imageSrc={Hotels}
                  type={Type}
                  setType={setType}
                />
                <MenuContainer
                  key={"attractions"}
                  title="Attractions"
                  imageSrc={Attractions}
                  type={Type}
                  setType={setType}
                />
                <MenuContainer
                  key={"restaurants"}
                  title="Restaurants"
                  imageSrc={Restaurants}
                  type={Type}
                  setType={setType}
                />
            </View>

            <View className="flex-row px-4">
                <Text className="text-[28px] text-[#0B646B] font-bold">Top Tips</Text>
                <TouchableOpacity>
                    <Text>Explore</Text>
                    
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView> 
  )
}

export default Discover