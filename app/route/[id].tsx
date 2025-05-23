import { AppHeader } from '@/components/AppHeader';
import CarInfoItem from '@/components/Route-overview/CarInfoItem';
import StopListItem from '@/components/Route-overview/StopListItem';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const RouteDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const exampleInfo: StopListItemInfo = {
  crates: 0,
  pallets: 1,
  rollerCart: 2,
  hasNote: true,
};

  return (
    <View className='flex-1'>
      <AppHeader title={`Route ${id}`} />
      <ScrollView className='px-6 mt-4'>
        <View className="bg-white p-4 rounded-2xl shadow mt-3 space-y-4">
          <View className="flex-row justify-between items-center">
            <View className='w-full'>
                <Text className="text-xl text-gray-700">
                  <Text className="font-bold">Voertuig informatie</Text>
                </Text>
               <View className="w-full flex-col mt-2">
                  <CarInfoItem title='Type' value='Service bus' />
                  <CarInfoItem title='Kenteken' value='AB-123-CD' />
                  <CarInfoItem title='Model' value='Mercedes Vito' />
                </View>
              </View>
            </View>
          </View>
          <View className='mt-5'>
            <Text className="text-2xl text-gray-700">
              <Text className="font-bold">Volgende stop</Text>
            </Text>
            <View className='bg-white p-4 rounded-2xl shadow mt-3 space-y-4'>
              <View className='flex-row'>
                <View className="w-12 h-12 bg-blue-600 rounded-lg items-center justify-center">
                  <Text className="text-white text-2xl font-semibold">2</Text>
                </View>
                <View className='flex-col px-3 justify-center'>
                  <Text className='text-gray-400'>John Smith</Text>
                  <Text className='font-bold mt-1'>Stationstraat 1A, Amsterdam</Text>
                </View>
              </View>
              <View className='w-full rounded p-3 mt-4' style={{
                  backgroundColor: '#EEEDFF'
                }}>
                  <Text className='font-bold text-lg'>Bezorg informatie:</Text>
                  <Text className='text-gray-400 mt-1'>
                    Oprit oprijden aan del inkerkant van het huis. Daar aanbellen
                  </Text>
              </View>
              <View className="flex-row justify-between items-center mt-4">
                <TouchableOpacity 
                  className="flex-1 border border-blue-600 px-4 py-2 rounded flex-row items-center justify-center space-x-2 bg-transparent mr-2"
                  onPress={() => {
                    const address = 'Vogelwikke 15, Venray';
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                    Linking.openURL(url);
                  }}>
                  <Text className="text-blue-600 font-medium pe-2">Start navigatie</Text>
                  <Ionicons name="navigate-outline" size={16} color="#2563EB" />
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-1 bg-blue-600 px-4 py-2 rounded flex-row items-center justify-center space-x-1 shadow-sm"
                  onPress={() => router.push('./stop/1')}
                  >
                  <Text className="text-white text-sm font-semibold pe-2">Zie details</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        <View 
          className="flex-col mt-4"
        >
          <StopListItem onPress={() => router.push("/route/laden/Index")} title='Laden' status='In behandeling' info={exampleInfo} stopId={<FontAwesome5 name="truck" size={17} color="white" />} />
          <StopListItem onPress={() => router.push("./stop/1")} title='Stationstraat 1A, Amsterdam' info={exampleInfo} status='In behandeling' stopId="1" />
          <StopListItem onPress={() => router.push("./stop/1")} title='Stationstraat 1A, Amsterdam' info={exampleInfo} status='In behandeling' stopId="1" />
          <StopListItem onPress={() => router.push("./stop/1")} title='Stationstraat 1A, Amsterdam' info={exampleInfo} status='In behandeling' stopId="1" />
          <StopListItem onPress={() => router.push("./stop/1")} title='Terug naar depot' info={exampleInfo} status='In behandeling' stopId={<FontAwesome5 name="truck" size={17} color="white" />} />
        </View>
        <View className='h-10' />
      </ScrollView>
    </View>
  )
}

export default RouteDetails