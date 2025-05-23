import { AppHeader } from '@/components/AppHeader';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function StopDetail() {
const { id } = useLocalSearchParams();  
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Toestemming geweigerd', 'Camera-toegang is vereist.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  return (
    <View className='flex-1'>
        <AppHeader title={`Stop ${id}`} />
        <ScrollView className='pt-9 px-6'>
          <View className='bg-white shadow p-4 rounded flex-row'>
            <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
              <FontAwesome5 name="user" size={17} color="#0062CC" />
            </View>
            <View className='flex-col ps-3'>
              <Text className='font-bold text-xl pb-2'>Klant gegevens</Text>
              <Text className='text-gray-400'>John Doe</Text>
              <Text className='text-blue-600 mt-1'>+31 6 12345678</Text>
            </View>
          </View>
          <View className='bg-white shadow p-4 rounded flex-row mt-7'>
            <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
              <FontAwesome5 name="route" size={17} color="#0062CC" />
            </View>
            <View className='flex-col ps-3'>
              <Text className='font-bold text-xl pb-2'>Adres</Text>
              <Text className='text-gray-400'>Stationsstraat 1, Amsterdam</Text>
              <TouchableOpacity
                className='flex-row pt-2'
                onPress={() => {
                  const address = 'Vogelwikke 15, Venray';
                  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                  Linking.openURL(url);
                }}
              >
                <Ionicons name="navigate-outline" size={16} color="#2563EB" className='pt-1' />
                <Text className='text-blue-600 mt-1 ps-2'>Open in maps</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className='bg-white shadow p-4 rounded flex-row mt-7'>
            <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
              <FontAwesome5 name="truck" size={15} color="#0062CC" />
            </View>
            <View className='flex-col ps-3'>
              <Text className='font-bold text-xl pb-2'>Bezorg informatie</Text>
              <Text className='text-gray-400 w-[80%]'>Oprit oprijden aan de linkerkant van het huis. Daar aanbellen.</Text>
            </View>
          </View>
          <View className='bg-white shadow p-4 rounded flex-row mt-7'>
            <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
              <FontAwesome5 name="box" size={15} color="#0062CC" />
            </View>
            <View className='flex-col ps-3 flex-1'>
              <Text className='font-bold text-xl pb-2'>Levering</Text>
              <View className='flex-col pt-2'>
                <View className='flex-row justify-between mb-1'>
                  <Text className='text-black font-bold'>Kratten</Text>
                  <Text className='text-gray-400'>5</Text>
                </View>
                <View className='flex-row justify-between mb-1'>
                  <Text className='text-black font-bold'>BVM</Text>
                  <Text className='text-gray-400'>21</Text>
                </View>
                <View className='flex-row justify-between mb-1'>
                  <Text className='text-black font-bold'>Grote BBQ</Text>
                  <Text className='text-gray-400'>1</Text>
                </View>
                <View className='flex-row justify-between mb-1'>
                  <Text className='text-black font-bold'>Gasfles</Text>
                  <Text className='text-gray-400'>1</Text>
                </View>
              </View>
            </View>
          </View>
            <TouchableOpacity
                className="overflow-hidden border-gray-400 border border-dashed rounded flex-col justify-center items-center mt-7 h-40 w-full overflow-hidden"
                onPress={openCamera}
              >
                {photoUri ? (
                  <Image
                    source={{ uri: photoUri }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <FontAwesome5 name="camera" size={30} color="#0062CC" />
                    <Text className="text-gray-400 font-bold pt-3">Klik hier om een foto te uploaden</Text>
                  </>
                )}
              </TouchableOpacity>
          <View className='mt-7'>
            <Text className='font-bold text-xl'>Opmerking (optioneel)</Text>
            <TextInput 
              className='border-black border p-4 rounded flex-col justify-center items-center mt-1 h-40'
              multiline={true}
            />
          </View>
          <View className='h-10' />
        </ScrollView>
        <View className="bg-white w-full h-[80px] shadow flex-row px-6 justify-between items-center space-x-2">
          <TouchableOpacity className="flex-1 border border-blue-600 rounded h-10 flex-row items-center justify-center px-4 py-2 me-2">
            <Text className="text-blue-600 font-bold pe-2">Storing melden</Text>
            <FontAwesome5 name="exclamation-triangle" size={15} color="#0062CC" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-600 rounded h-10 flex-row items-center justify-center px-4 py-2">
            <Text className="text-white font-bold pe-2">Bevestigen</Text>
            <Ionicons name="arrow-forward-outline" size={16} color="white" />
          </TouchableOpacity>
        </View>
    </View>
  )
}