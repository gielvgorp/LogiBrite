import React from 'react'
import { Text, View } from 'react-native'

export default function StopListItemInfoItem({icon, name, value}: StopListItemInfoItemProps) {
  return (
    <View className='flex-row pe-4 items-center'>
        {icon &&  <View className='pe-2'>{icon}</View>}
        {value && <Text className='pe-1 text-sm text-gray-400'>{value}</Text>}
        {name && <Text className='text-sm text-gray-400'>{name}</Text>}
    </View>
  )
}