import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    title: string;
    value: string;
}

export default function CarInfoItem({title, value}: Props) {
  return (
    <View className="flex-row justify-between mt-1">
        <Text className="font-semibold">{title}:</Text>
        <Text className="text-gray-400">{value}</Text>
    </View>
  )
}