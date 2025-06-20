import { AppHeader } from '@/components/AppHeader';
import { routeService } from '@/services/routeService';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

export default function Index() {
  const { routeId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [startMileage, setStartMileage] = useState("0");
  const [finalMileage, setFinalMileage] = useState("0");
  const [totalDrivenKm, setTotalDrivenKm] = useState(0);
  const [fuelTanked, setFuelTanked] = useState("0");
  const [fuelConsumption, setFuelConsumption] = useState(0);

  useEffect(() => {
    const new_value = parseInt(finalMileage) - parseInt(startMileage);
    setTotalDrivenKm(new_value);
  }, [finalMileage]);

  useEffect(() => {
    const fuel_consumption = totalDrivenKm / parseInt(fuelTanked);
    setFuelConsumption(parseInt(fuel_consumption.toFixed(2)));
  }, [totalDrivenKm, fuelTanked]);

  useEffect(() => {
     const fetchData = async () => {
          const route = await routeService.getRouteById(parseInt(routeId.toString()));
          setStartMileage((route?.startMileage ?? 0).toString());
          setIsLoading(false);
        };
    
        fetchData();
  }, [])

  const handleCompleteRoute = () => {
    routeService.completeRoute(parseInt(routeId.toString()), parseInt(finalMileage), parseInt(fuelTanked));

    router.push(`../../${routeId}`);
  } 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1" 
      >
        <AppHeader title="Route afronden" showBackButton={true} />
        {isLoading ? (
          <ActivityIndicator size="large" className="mt-5" />
        ) : (
          <View className="flex-col justify-between w-full mt-5 px-6 flex-1 pb-20">
            <View className="flex-col w-full bg-white p-5 rounded shadow">
              <View className='flex-row items-center pb-5'>
                  <View className='w-10 h-10 flex-row justify-center items-center bg-blue-300 rounded-3xl'>
                    <FontAwesome5 name="route" size={17} color="#0062CC" />
                  </View>
                  <Text className='font-bold text-xl ps-3'>Eindgegevens invoeren</Text>
              </View>
              <View className="flex-row justify-between pb-3">
                <Text className="font-bold">Kilometer stand</Text>
                <TextInput
                  className="border-b border-black w-[80px] text-center"
                  keyboardType="numeric"
                  placeholder="Km"
                  placeholderTextColor="gray"
                  value={finalMileage}
                  onChangeText={setFinalMileage}
                />
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Liter getankt</Text>
                <TextInput
                  className="border-b border-black w-[80px] text-center"
                  keyboardType="numeric"
                  placeholder="Liter"
                  placeholderTextColor="gray"
                  value={fuelTanked}
                  onChangeText={setFuelTanked}
                />
              </View>
            </View>

            <View className="w-100 flex-col pt-3 bg-white p-5 rounded shadow">
              <View className="flex-row justify-between pb-3">
                <Text className="font-bold">Kilometerstand begin</Text>
                <Text className="text-gray-400">{startMileage}</Text>
              </View>
              <View className="flex-row justify-between pb-3">
                <Text className="font-bold">Kilometerstand eind</Text>
                <Text className="text-gray-400">{finalMileage}</Text>
              </View>
              <View className="flex-row justify-between pb-3">
                <Text className="font-bold">Gereden kilometers</Text>
                <Text className="text-gray-400">{totalDrivenKm}</Text>
              </View>
              <View className="flex-row justify-between pb-3">
                <Text className="font-bold">Brandstof verbruik</Text>
                <Text className="text-gray-400">
                  {isNaN(fuelConsumption) || !isFinite(fuelConsumption)
                    ? "Niet beschikbaar"
                    : `${fuelConsumption.toFixed(1)} km op 1 liter`}
                </Text>
              </View>
              <TouchableOpacity className="bg-blue-600 py-4 rounded flex-row items-center justify-center mt-4 space-x-1 shadow-sm" onPress={handleCompleteRoute}>
                <Text className="text-white font-semibold me-3">Route afronden</Text>
                <FontAwesome5 name="sign-out-alt" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
