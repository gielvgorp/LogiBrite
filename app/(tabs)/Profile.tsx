import { AppHeader } from '@/components/AppHeader';
import { userService } from '@/services/userService';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await userService.getDriverByID(1);
      setUser(userData);
      setIsLoading(false);
    };

    fetchData();
  }, []); // Vergeet niet de dependency array!

  const handleLogout = () => {
    router.push("../../");
  }

  return (
    <View className="flex-1">
      <AppHeader title="Profiel" />
      {isLoading || !user ? (
        <ActivityIndicator size="large" className="mt-5" />
      ) : (
        <View className='w-full px-6 flex-1'>
          <View className="mt-8 flex-col items-center border-b border-black">
            <Image
              source={{ uri: user.avatar }}
              className="rounded-full w-40 h-40"
            />
            <Text className="text-center font-bold text-2xl mt-2">
              {user.name}
            </Text>
            <Text className="text-center text-gray-400 text-xl pb-4">
              {user.role}
            </Text>
          </View>
          <View className="flex-row justify-between w-full mt-4">
            <View className="flex-1 bg-blue-600 p-4 rounded me-1">
              <Text className="text-center text-white">0</Text>
              <Text className="text-center text-white">Gereden km</Text>
            </View>
            <View className="flex-1 bg-blue-600 p-4 rounded mx-1">
              <Text className="text-center text-white">0</Text>
              <Text className="text-center text-white">Routes</Text>
            </View>
            <View className="flex-1 bg-blue-600 p-4 rounded ms-1">
              <Text className="text-center text-white">0</Text>
              <Text className="text-center text-white">Leveringen</Text>
            </View>
          </View>
          <View className='flex-1 text-center m-auto flex-col justify-end'>
             <TouchableOpacity className="bg-blue-600 px-10 py-4 mb-5 rounded flex-row items-center space-x-1 shadow-sm" onPress={handleLogout}>
                <Text className="text-white text-sm font-semibold me-3">Uitloggen</Text>
                <FontAwesome5 name="sign-out-alt" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
