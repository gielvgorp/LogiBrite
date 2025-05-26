import { AppHeader } from '@/components/AppHeader';
import RouteOfToday from '@/components/Home/RouteOfToday';
import { MOCK_USER } from '@/constants/MockData';
import { routeService } from '@/services/routeService';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const Home = () => {
  const router = useRouter();

const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await routeService.getRoutesOfToDay();
      setRoutes(data);
    };

    fetchRoutes();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <AppHeader title='LogiBrite' showBackButton={false} />
      <ScrollView className="px-6 mt-4">
        {/* Welcome */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-600 text-2xl">Welkom terug,</Text>
            <Text className="text-4xl font-bold text-black">{MOCK_USER.name}</Text>
          </View>
          <Image
            source={{ uri: MOCK_USER.avatar }}
            className="w-20 h-20 rounded-full"
          />
        </View>

        {/* Route Card */}
       <View className="mt-7">
          <Text className="text-xl font-bold text-gray-800">Je route van vandaag</Text>
            {
              Array.isArray(routes) && routes.map((route: Route) => {
                return (
                  <RouteOfToday
                    key={route.id}
                    id={route.id}
                    routeDate={route.date}
                    amountOfStops={route.stops.length}
                    routeName={route.name}
                    routeTime="1u 45m"
                  />
                );
              })
            }


        </View>


       
      </ScrollView>
    </View>
  );
}

export default Home