import { Ionicons } from '@expo/vector-icons'; // of 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  backDestination?: string;
  rightAction?: React.ReactNode;
}

export function AppHeader({ 
  title, 
  showBackButton = false,
  backDestination,
  rightAction
}: AppHeaderProps) {
  const navigation = useNavigation<any>();
  const router = useRouter();

  const handleBack = () => {
    if (backDestination) {
      router.push(backDestination as Href);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View> 
      <SafeAreaView className="bg-blue-600">
        <View className="px-4 py-3 flex-row items-center justify-between h-[62px]">
          <View className="flex-row items-center w-full justify-between">
            {showBackButton ? (
              <TouchableOpacity onPress={handleBack} className="pr-4 flex-row items-center">
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text className='text-white text-xl'>Terug</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 24 }} /> // Placeholder zodat titel gecentreerd blijft
            )}

            <Text className="text-white text-2xl font-semibold text-center flex-1">
              {title}
            </Text>

            <View style={{ width: 24 }}>
              {rightAction}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}