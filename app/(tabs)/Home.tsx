import { AppHeader } from '@/components/AppHeader';
import { MOCK_USER } from '@/constants/MockData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <AppHeader title='LogiBrite' showBackButton={false} />
      <ScrollView className="px-6 mt-4">
        {/* Welcome */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-600 text-2xl">Welkom terug,</Text>
            <Text className="text-4xl font-bold text-black">{MOCK_USER.name}</Text>
          </View>
          <Image
            source={{ uri: MOCK_USER.avatar }}
            className="w-20 h-20 rounded-full"
          />
        </View>

        {/* Route Card */}
       <View className="mt-7">
          <Text className="text-xl font-bold text-gray-800">Je route van vandaag</Text>

          <View className="bg-white p-4 rounded-2xl shadow mt-3 space-y-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg text-gray-700">
                  <Text className="font-bold">Route</Text>: Zeeland
                </Text>
                <Text className="text-gray-400">1 januari 2025</Text>
              </View>


              <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded flex-row items-center space-x-1 shadow-sm" onPress={() => router.push('/route/1')}>
                <Text className="text-white text-sm font-semibold me-3">Start route</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-start space-x-6 mt-5">
              <View className="flex-row items-center space-x-2">
                <Ionicons name="location-outline" size={18} color="#6B7280" />
                <Text className="text-sm text-gray-600 ps-1">8 stops</Text>
              </View>
              <View className="flex-row items-center ps-4">
                <Ionicons name="time-outline" size={18} color="#6B7280" />
                <Text className="text-sm text-gray-600 ps-1">1u 45m</Text>
              </View>
            </View>
          </View>
        </View>


       
      </ScrollView>
    </View>
  );
}

export default Home