import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function RouteOfToday({ routeName, routeDate, amountOfStops, routeTime, id }: RouteOfToday) {
    const router = useRouter();
  
    return (
    <View className="bg-white p-4 rounded-2xl shadow mt-3 space-y-4">
        <View className="flex-row justify-between items-center">
            <View>
                <Text className="text-lg text-gray-700">
                    <Text className="font-bold">Route</Text>: {routeName}
                </Text>
                <Text className="text-gray-400">{routeDate}</Text>
            </View>


            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded flex-row items-center space-x-1 shadow-sm" onPress={() => router.push(`/route/${id}`)}>
                <Text className="text-white text-sm font-semibold me-3">Start route</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="white" />
            </TouchableOpacity>
        </View>

        <View className="flex-row justify-start space-x-6 mt-5">
            <View className="flex-row items-center space-x-2">
                <Ionicons name="location-outline" size={18} color="#6B7280" />
                <Text className="text-sm text-gray-600 ps-1">{amountOfStops} stops</Text>
            </View>
            <View className="flex-row items-center ps-4">
                <Ionicons name="time-outline" size={18} color="#6B7280" />
                <Text className="text-sm text-gray-600 ps-1">{routeTime}</Text>
            </View>
        </View>
    </View>
  )
}