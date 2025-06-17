import { Ionicons } from '@expo/vector-icons'; // of 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { Href, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  showMapButton?: boolean;
  backDestination?: string;
  mapDestination?: string;
  rightAction?: React.ReactNode;
}
export function AppHeader({ 
  title, 
  showBackButton = false,
  backDestination,
  showMapButton,
  mapDestination
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

  const handleOpenMap = () => {
    if (mapDestination) {
      router.push(mapDestination as Href);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View> 
      <SafeAreaView className="bg-blue-600">
        <View className="relative h-[62px] justify-center items-center">
          <Text className="text-white text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
            {title}
          </Text>

          <View className="absolute left-4 flex-row items-center w-[80px]">
            {showBackButton && (
              <TouchableOpacity onPress={handleBack} className="flex-row items-center">
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text className="text-white text-xl ml-1">Terug</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="absolute right-4 w-[80px] items-end">
            {showMapButton && (
              <TouchableOpacity onPress={handleOpenMap}>
                <Ionicons name="map" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}