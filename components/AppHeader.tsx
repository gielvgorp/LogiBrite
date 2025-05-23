import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
}

export function AppHeader({ 
  title, 
  showBackButton = false,
  rightAction
}: AppHeaderProps) {
  
  return (
    <View> 
      <SafeAreaView className="bg-blue-600">
      <View className="px-4 py-3 flex-row items-center justify-between h-[62px]">
        <View className="flex-row items-center space-x-2 justify-between w-full">
           <Image 
              source={require('../assets/images/logo.png')}
              resizeMode="contain" 
              className="h-10 w-10"
            />
          <Text className="text-white text-2xl font-semibold text-center position-absolute">{title}</Text>
          <Text></Text>
        </View>
      </View>
    </SafeAreaView>
    </View>
    

  );
}