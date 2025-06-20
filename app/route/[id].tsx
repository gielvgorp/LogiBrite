import { AppHeader } from '@/components/AppHeader';
import CarInfoItem from '@/components/Route-overview/CarInfoItem';
import NextStop from '@/components/Route-overview/NextStop';
import StopListItem from '@/components/Route-overview/StopListItem';
import { routeService } from '@/services/routeService';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

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
    try {
      const routeId = parseInt(id?.toString());
      if (isNaN(routeId)) {
        console.warn("Route ID is ongeldig:", id);
        return;
      }

      const stops = await routeService.getStops(routeId);
      setStops(stops);
      setStopsIsLoading(false);

      const route = await routeService.getRouteById(routeId);

      if (!route) {
        console.warn("Route niet gevonden met ID:", routeId);
        return;
      }

      const info: StopListItemInfo = {
        rollerCart: route.rollerCart ?? 0,
        pallets: route.pallets ?? 0,
      };
      setRoute(route);
      setRouteInfo(info);
      setRouteIsLoading(false);

      const nextStop = await routeService.getNextStop(routeId);
      setNextStop(nextStop);
      setNextStopIsLoading(false);

      setIsLocked(route.isLocked ?? true);
    } catch (error) {
      console.error("Fout bij ophalen routegegevens:", error);
    } finally {
      setIsLoading(false); // Zorg dat deze altijd wordt aangeroepen
    }
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
      <AppHeader title={`Route ${id}`} showBackButton={true} backDestination={`../(tabs)/Home`} mapDestination={`../route/${id}/map/Index`} showMapButton={true} />
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
          <NextStop 
            isLocked={isLocked}
            routeId={id.toString()}
            stop={nextStop}
          />
        <View 
          className="flex-col mt-7"
        >
          <StopListItem arrivalTime='08:00' isLocked={false} key={0} onPress={() => router.push(`/route/laden/${id}`)} title='Laden' status={!isLocked ? "Geleverd" : "In behandeling"} info={routeInfo} stopIcon={<FontAwesome5 name="truck" size={17} color="white" />} />
           { 
              stops
                ?.map((stop: RouteStop) => (
                  <StopListItem 
                    isLocked={isLocked ?? true}
                    key={parseInt(stop.id)}
                    onPress={() => router.push(`./${id}/stop/${stop.stopNumber}/Index`)} 
                    title={stop.customer.address}
                    info={{
                      hasNote: stop.deliveryNote.length > 0,
                    }} 
                    status={stop.report ? "Report" : stop.status}
                    stopId={stop.stopNumber.toString()} 
                    arrivalTime={stop.scheduledTime}
                  />
                ))
            }
          <StopListItem arrivalTime='17:00' isLocked={isLocked ?? true} key={-1} onPress={() => router.push(`/route/${id}/completeRoute/Index`)} title='Terug naar depot' status={route?.status === "completed" ? "Geleverd" : "In behandeling"} stopIcon={<FontAwesome5 name="truck" size={17} color="white" />} />
        </View>
        <View className='h-10' />
      </ScrollView>
      }
     
    </View>
  )
}

export default RouteDetails