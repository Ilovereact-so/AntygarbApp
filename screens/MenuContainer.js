import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Attractions, Hotels, Restaurants } from '../assets'
import { Image } from 'react-native-animatable'

const MenuContainer = ({title, imageSrc, type, setType}) => {

const handlePress = ()=> {
    setType(title.toLowerCase())
}
    return (
    <View className="flex-row justify-evenly my-8">
        <TouchableOpacity className="justify-center items-center" onPress={handlePress}>
            <View className={`p-2 shadow-sm justify-center items-center mb-2 ${
                type === title.toLowerCase() ? "bg-gray-200 rounded-full" : ""
            }`}>
                <Image source={imageSrc} className="w-24 h-24"/>
            </View>
            <Text className="text-[18px] text-[#00BCC9] font-bold">{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default MenuContainer