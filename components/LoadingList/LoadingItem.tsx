import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function LoadingItem({stopId, customerName, address, totalOverview, items}: LoadingItem) {
  return (
    <View className='rounded w-full shadow p-6 shadow bg-white mt-7 flex-col'>
        <View className='flex-row w-full'>
            <View className='bg-blue-600 w-10 h-10 rounded-lg flex-row justify-center items-center'>
                {
                    totalOverview ? <FontAwesome5 name="truck" size={15} color="white" /> : <Text className='font-bold text-white text-xl'>{stopId}</Text>
                }
            </View>
            <View className='flex-col ps-3 justify-center'>
                <Text className='text-black font-bold'>{customerName}</Text>
                {address && <Text className='text-blue-600'>{address}</Text>}
            </View>
        </View>
            <View className='p-4 mt-5 flex-col' style={{
            backgroundColor: '#EEEDFF'
        }}>
            {
                items.map((item, index) => (
                    <View className='flex-row w-full justify-between pb-1' key={index}>
                        <Text className='font-bold text-black'>{item.itemName}</Text>
                        <Text className='text-gray-400'>{item.quantity}</Text>
                    </View>
                ))
            }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})