import React from 'react'
import { Text, View } from 'react-native'

export default function StopListItemInfoItem({icon, name, value}: StopListItemInfoItemProps) {
  return (
    <View className='flex-row pe-4'>
        {icon &&  <Text className='pe-2'>{icon}</Text>}
        {value && <Text className='pe-1'>{value}</Text>}
        {name && <Text>{name}</Text>}
    </View>
  )
}