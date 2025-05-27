import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NextStop {
    stop: RouteStop | undefined;
    isLocked: boolean;
    routeId: string  ;
}

export default function NextStop({stop, isLocked, routeId}: NextStop) {
    const router = useRouter();
  return (
            stop &&
            <View className='mt-7'>
            <Text className="text-2xl text-gray-700">
              <Text className="font-bold">Volgende stop</Text>
            </Text>
            <View className='bg-white p-4 rounded-2xl shadow mt-2 space-y-4'>
              <View className='flex-row'>
                <View className="w-12 h-12 bg-blue-600 rounded-lg items-center justify-center">
                  <Text className="text-white text-2xl font-semibold">{stop.stopNumber}</Text>
                </View>
                <View className='flex-col px-3 justify-center'>
                  <Text className='text-gray-400'>{stop.customer.name}</Text>
                  <Text className='font-bold mt-1'>{stop.customer.address}, {stop.customer.city}</Text>
                </View>
              </View>
              {
                stop.deliveryNote &&
                <View className='w-full rounded p-3 mt-4' style={{
                  backgroundColor: '#EEEDFF'
                }}>
                  <Text className='font-bold text-lg'>Bezorg informatie:</Text>
                  <Text className='text-gray-400 mt-1'>
                    {stop.deliveryNote}
                  </Text>
                </View>
              }
              <View className="flex-row justify-between items-center mt-4">
                <TouchableOpacity 
                  className="flex-1 border border-blue-600 px-4 py-2 rounded flex-row items-center justify-center space-x-2 bg-transparent mr-2"
                  onPress={() => {
                    if(isLocked){
                      Alert.alert("Route vergrendeld", "Je moet eerst de route ontgrendelen voordat je naar de klant mag gaan!");
                      return;
                    }
                    
                    const address = 'Vogelwikke 15, Venray';
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                    Linking.openURL(url);
                  }}>
                  <Text className="text-blue-600 font-medium pe-2">Start navigatie</Text>
                  <Ionicons name="navigate-outline" size={16} color="#2563EB" />
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-1 bg-blue-600 px-4 py-2 rounded flex-row items-center justify-center space-x-1 shadow-sm"
                  onPress={() => { 
                    if(isLocked){
                      Alert.alert("Route vergrendeld", "Je moet eerst de route ontgrendelen voordat je naar de klant mag gaan!");
                      return;
                    }

                    router.push(`./${routeId}/stop/${stop.stopNumber}`)
                  }}
                  >
                  <Text className="text-white text-sm font-semibold pe-2">Zie details</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
  )
}

const styles = StyleSheet.create({})