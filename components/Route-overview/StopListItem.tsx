import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import StopListItemInfoItem from './StopListItemInfoItem';

export default function StopListItem({title, status, stopId, info, onPress, isLocked, stopIcon}: StopListItem) {

  const getColor = () => {
    switch(status){
      case "Geleverd":
        return "bg-green-600";
      case "Geannuleerd":
        return "bg-red-600";
      default:
        return "bg-blue-600";
    }
  }

  const handleOnpress = () =>{
    if(!isLocked)
      onPress();
  }

  return (
    <TouchableOpacity className='bg-white p-4 rounded-2xl shadow mt-3 space-y-4 relevant' onPress={handleOnpress}>
      <View className='flex-row'>
        <View className={`${getColor()} w-12 h-12 rounded-lg items-center justify-center`}>
          {
            stopId ? (
              <Text className='text-white font-bold text-2xl'>{stopId}</Text>
            ) : stopIcon ? (
              typeof stopIcon === 'string' ? (
                <Text>{stopIcon}</Text>
              ) : (
                stopIcon
              )
            ) : null
          }

        </View>
        <View className='flex-col justify-between ps-3 flex-1'>
          <View className='flex-row justify-between flex-1'>
            <Text className='font-bold text-lg'>{title}</Text>
             {isLocked ? <FontAwesome5 name="lock" size={15} color="red" /> : <></>}
          </View>

          {
            info && <View className="flex-row flex-1 space-x-4">
            {info.rollerCart && (
              <StopListItemInfoItem
                icon={<FontAwesome5 name="pallet" size={17} color="gray" />}
                name="rollerkar"
                value={info.rollerCart.toString()}
              />
            )}
             {info.pallets && (
              <StopListItemInfoItem
                icon={<FontAwesome5 name="pallet" size={17} color="gray" />}
                name="Pallets"
                value={info.pallets.toString()}
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
          }
          
        </View>
      </View>
    </TouchableOpacity>
  )
}