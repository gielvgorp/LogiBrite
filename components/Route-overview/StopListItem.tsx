import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import StopListItemInfoItem from './StopListItemInfoItem';

export default function StopListItem({title, status, stopId, info, onPress}: StopListItem) {

  return (
    <TouchableOpacity className='bg-white p-4 rounded-2xl shadow mt-3 space-y-4' onPress={onPress}>
      <View className='flex-row'>
        <View className='bg-blue-600 w-12 h-12 rounded-lg items-center justify-center'>
          <Text className='text-white font-bold text-2xl'>{stopId}</Text>
        </View>
        <View className='flex-col justify-between items-center ps-3'>
          <Text className='font-bold text-lg'>{title}</Text>
          <View className="flex-row justify-between flex-1 space-x-4">
            {info.crates && (
              <StopListItemInfoItem
                icon={<FontAwesome5 name="package" size={17} color="gray" />}
                name="kratten"
                value={info.crates.toString()}
              />
            )}
            {info.rollerCart && (
              <StopListItemInfoItem
                icon={<FontAwesome5 name="pallet" size={17} color="gray" />}
                name="rollerkar"
                value={info.rollerCart.toString()}
              />
            )}
            {info.hasNote && (
              <StopListItemInfoItem
                icon={<FontAwesome5 name="comment" size={17} color="gray" />}
                name="Met opmerking"
                value=""
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}