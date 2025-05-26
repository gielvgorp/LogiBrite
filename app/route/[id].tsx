import { AppHeader } from '@/components/AppHeader';
import CarInfoItem from '@/components/Route-overview/CarInfoItem';
import StopListItem from '@/components/Route-overview/StopListItem';
import { routeService } from '@/services/routeService';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const RouteDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStopsLoading, setStopsIsLoading] = useState(true);
  const [isRouteLoading, setRouteIsLoading] = useState(true);
  const [isNextStopLoading, setNextStopIsLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [route, setRoute] = useState<Route>();
  const [nextStop, setNextStop] = useState<RouteStop>();
  const [routeInfo, setRouteInfo] = useState<StopListItemInfo>({hasNote: false, pallets:0, rollerCart: 0});
  const [stops, setStops] = useState<RouteStop[] | undefined>([]);
  const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const stops = await routeService.getStops(parseInt(id.toString()));
        setStops(stops);
        setStopsIsLoading(false);

        const route = await routeService.getRouteById(parseInt(id.toString()));
        const info: StopListItemInfo = {
          rollerCart: route?.rollerCart ?? 0,
          pallets: route?.pallets ?? 0,
        };
        setRoute(route);
        setRouteInfo(info);
        setRouteIsLoading(false);

        const nextStop = await routeService.getNextStop(parseInt(id.toString()));
        setNextStop(nextStop);
        setNextStopIsLoading(false);

        setIsLocked(route?.isLocked ?? true);
        setIsLoading(false);
      };

      fetchData();
    }, []);

      useEffect(() => {
          const fetchData = async () => {
            const nextStop = await routeService.getNextStop(parseInt(id.toString()));
            setNextStop(nextStop);
      };

      fetchData();
    }, [nextStop?.isCompleted]);

     useEffect(() => {
      setIsLocked(route?.isLocked ?? true);
    }, [route?.isLocked])
  return (
    
     
    <View className='flex-1'>
      <AppHeader title={`Route ${id}`} />
      {
    isLoading || isNextStopLoading || isRouteLoading || isStopsLoading ? 
                <ActivityIndicator className='mt-5' size="large" /> : 
                 <ScrollView className='px-6 mt-4'>
        <View className="bg-white p-4 rounded-2xl shadow mt-3 space-y-4">
          <View className="flex-row justify-between items-center">
            <View className='w-full'>
                <Text className="text-xl text-gray-700">
                  <Text className="font-bold">Voertuig informatie</Text>
                </Text>
               <View className="w-full flex-col mt-2">
                  <CarInfoItem title='Type' value={route?.car.type ?? "Onbekend"} />
                  <CarInfoItem title='Kenteken' value={route?.car.licencePlate ?? "Onbekend"} />
                  <CarInfoItem title='Model' value={route?.car.model ?? "Onbekend"} />
                </View>
              </View>
            </View>
          </View>
          {
            nextStop &&
            <View className='mt-5'>
            <Text className="text-2xl text-gray-700">
              <Text className="font-bold">Volgende stop</Text>
            </Text>
            <View className='bg-white p-4 rounded-2xl shadow mt-3 space-y-4'>
              <View className='flex-row'>
                <View className="w-12 h-12 bg-blue-600 rounded-lg items-center justify-center">
                  <Text className="text-white text-2xl font-semibold">{nextStop.stopNumber}</Text>
                </View>
                <View className='flex-col px-3 justify-center'>
                  <Text className='text-gray-400'>{nextStop.customer.name}</Text>
                  <Text className='font-bold mt-1'>{nextStop.customer.address}, {nextStop.customer.city}</Text>
                </View>
              </View>
              {
                nextStop.deliveryNote &&
                <View className='w-full rounded p-3 mt-4' style={{
                  backgroundColor: '#EEEDFF'
                }}>
                  <Text className='font-bold text-lg'>Bezorg informatie:</Text>
                  <Text className='text-gray-400 mt-1'>
                    {nextStop.deliveryNote}
                  </Text>
                </View>
              }
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
                  onPress={() => router.push(`./${id}/stop/${nextStop.stopNumber}`)}
                  >
                  <Text className="text-white text-sm font-semibold pe-2">Zie details</Text>
                  <Ionicons name="arrow-forward-outline" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          }
        <View 
          className="flex-col mt-4"
        >
          <StopListItem isLocked={false} key={0} onPress={() => router.push(`/route/laden/${id}`)} title='Laden' status={!isLocked ? "Geleverd" : "In behandeling"} info={routeInfo} stopIcon={<FontAwesome5 name="truck" size={17} color="white" />} />
           { 
              stops
                ?.map((stop: RouteStop) => (
                  <StopListItem 
                  isLocked={isLocked ?? true}
                  key={stop.id}
                    onPress={() => router.push(`./${id}/stop/${stop.stopNumber}`)} 
                    title={stop.customer.address}
                    info={{
                      hasNote: stop.deliveryNote.length > 0,
                    }} 
                    status={stop.status}
                    stopId={stop.stopNumber.toString()} />
                ))
            }
          <StopListItem isLocked={false} key={-1} onPress={() => router.push(`./stop/1`)} title='Terug naar depot' status='In behandeling' stopIcon={<FontAwesome5 name="truck" size={17} color="white" />} />
        </View>
        <View className='h-10' />
      </ScrollView>
      }
     
    </View>
  )
}

export default RouteDetails