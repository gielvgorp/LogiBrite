import { AppHeader } from '@/components/AppHeader';
import { routeService } from '@/services/routeService';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Linking, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function StopDetail() {
  const { routeId, stopId } = useLocalSearchParams();  
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [stopNote, setStopNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stopInfo, setStopInfo] = useState<RouteStop>();
  const router = useRouter();
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        const stop = await routeService.getStopById(parseInt(routeId.toString()), stopId.toString());
        setStopInfo(stop);
        setPhotoUri(stop?.proofOfDelivery.photoUri ?? "");
        setStopNote(stop?.proofOfDelivery.notes ?? "");
        setIsLoading(false);
      };

      fetchData();
  }, []);

  const handleDeliveryCompleted = () => {
    if(photoUri) {
      routeService.completeStop(parseInt(routeId.toString()), stopId.toString(), {
        photoUri: photoUri,
        notes: stopNote ?? ""
      });

      router.push(`/route/${routeId}/stop/${parseInt(stopId.toString()) + 1}`);
      return;
    }

    Alert.alert("Upload een foto", "Je moet een foto uploaden voordat je verder kan gaan!");
  }

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Toestemming geweigerd', 'Camera-toegang is vereist.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  return (
     <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // eventueel aanpassen
      >
          
      <View className='flex-1'>
        <AppHeader title={`Stop ${stopId}`} showBackButton={true} backDestination={`../${routeId}`} />
        {
          isLoading ? 
            <ActivityIndicator size="large" className='mt-5' /> :
            <>
              <ScrollView
                className="pt-9 px-6"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View className='bg-white shadow p-4 rounded flex-col'>
                  <View className='flex-row items-center pb-3'>
                    <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
                      <FontAwesome5 name="user" size={17} color="#0062CC" />
                    </View>
                     <Text className='font-bold text-xl ps-3'>Klant gegevens</Text>
                  </View>
                  
                  <View className='flex-col'>
                    <Text className='text-gray-400'>{stopInfo?.customer.name}</Text>
                    <Text className='text-blue-600 mt-1'>{stopInfo?.customer.phoneNumber}</Text>
                  </View>
                </View>
                <View className='bg-white shadow p-4 rounded flex-col mt-7'>
                  <View className='flex-row items-center pb-3'>
                     <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
                        <FontAwesome5 name="route" size={17} color="#0062CC" />
                      </View>
                     <Text className='font-bold text-xl ps-3'>Adres</Text>
                  </View>
                 
                  <View className='flex-col'>
                    <Text className='text-gray-400'>{stopInfo?.customer.address}, {stopInfo?.customer.city}</Text>
                    <TouchableOpacity
                      className='flex-row pt-2'
                      onPress={() => {
                        const address = `${stopInfo?.customer.address}, ${stopInfo?.customer.city}`;
                        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                        Linking.openURL(url);
                      }}
                    >
                      <Ionicons name="navigate-outline" size={16} color="#2563EB" className='pt-1' />
                      <Text className='text-blue-600 mt-1 ps-2'>Open in maps</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {
                  stopInfo?.deliveryNote && 
                  <View className='bg-white shadow p-4 rounded flex-col mt-7'>
                    <View className='flex-row items-center'>
                        <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
                          <FontAwesome5 name="truck" size={15} color="#0062CC" />
                        </View>
                       <Text className='font-bold text-xl ps-3'>Bezorg informatie</Text>
                    </View>
                   
                    <View className='flex-col pt-3'>
                      <Text className='text-gray-400 w-full'>{stopInfo.deliveryNote}</Text>
                    </View>
                  </View>
                }
                
                <View className='bg-white shadow p-4 rounded flex-col mt-7'>
                  <View className='flex-row items-center'>
                     <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
                      <FontAwesome5 name="box" size={15} color="#0062CC" />
                    </View>
                    <Text className='font-bold text-xl ps-3'>Levering</Text>
                  </View>
                  
                  <View className='flex-col pt-3 flex-1'>
                    <View className='flex-col'>
                      {
                        stopInfo?.items.map((item) => (
                            <View className='flex-row justify-between mb-1' key={item.id}>
                              <Text className='text-black font-bold'>{item.itemName}</Text>
                              <Text className='text-gray-400'>{item.quantity}</Text>
                            </View>
                        ))
                      }
                    </View>
                  </View>
                </View>
                  <TouchableOpacity
                      className="overflow-hidden border-gray-400 border border-dashed rounded flex-col justify-center items-center mt-7 h-40 w-full overflow-hidden"
                      onPress={openCamera}
                       onLongPress={() => {
                          if (photoUri) setIsPreviewVisible(true);
                        }}
                        delayLongPress={300}
                    >
                      {photoUri ? (
                      <Image
                        source={{ uri: photoUri }}
                        className="w-full h-full object-contain"
                        resizeMode="contain"
                      />
                      ) : (
                        <>
                          <FontAwesome5 name="camera" size={30} color="#0062CC" />
                          <Text className="text-gray-400 font-bold pt-3">Klik hier om een foto te uploaden</Text>
                        </>
                      )}
                    </TouchableOpacity>
                   {photoUri && (
                      <Text className="text-gray-400 italic mt-2 text-center">
                        Houd de foto ingedrukt om hem te bekijken
                      </Text>
                    )}

                <View className='mt-7'>
                  <Text className='font-bold text-xl'>Opmerking (optioneel)</Text>
                  <TextInput 
                    className='border-black border p-4 rounded flex-col justify-center items-center mt-1 h-40'
                    multiline={true}
                    value={stopNote ?? ""}
                    onChangeText={setStopNote}
                  />
                </View>
                <View className='h-10' />
                <Modal
                  visible={isPreviewVisible}
                  transparent={true}
                  animationType="fade"
                  onRequestClose={() => setIsPreviewVisible(false)}
                >
                  <View className="flex-1 bg-black bg-opacity-90 justify-center items-center">
                    <TouchableOpacity onPress={() => setIsPreviewVisible(false)} className="w-full h-full justify-center items-center">
                      <Image
                        source={{ uri: photoUri ?? '' }}
                        className="w-full h-full object-contain"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </Modal>
              </ScrollView>
              <View className="bg-white w-full h-[80px] shadow flex-row px-6 justify-between items-center space-x-2">
                <TouchableOpacity className="flex-1 border border-blue-600 rounded h-10 flex-row items-center justify-center px-4 py-2 me-2">
                  <Text className="text-blue-600 font-bold pe-2">Storing melden</Text>
                  <FontAwesome5 name="exclamation-triangle" size={15} color="#0062CC" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeliveryCompleted} className="flex-1 bg-blue-600 rounded h-10 flex-row items-center justify-center px-4 py-2">
                  <Text className="text-white font-bold pe-2">Bevestigen</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </>
        }
        
    </View>
          
      </KeyboardAvoidingView>
    
  )
}