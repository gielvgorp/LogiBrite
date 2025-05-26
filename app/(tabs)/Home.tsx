import { AppHeader } from '@/components/AppHeader';
import RouteOfToday from '@/components/Home/RouteOfToday';
import { routeService } from '@/services/routeService';
import { userService } from '@/services/userService';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

const Home = () => {
  const router = useRouter();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await routeService.getRoutesOfToDay();
      setRoutes(data);

      const driver = await userService.getDriverByID(1);
      setUser(driver);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <AppHeader title='LogiBrite' showBackButton={false} />
      {
        isLoading || !user ? <ActivityIndicator size="large" className='mt-5' /> :
          <ScrollView className="px-6 mt-4">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-gray-600 text-2xl">Welkom terug,</Text>
                <Text className="text-4xl font-bold text-black">{user.name}</Text>
              </View>
              <Image
                source={{ uri: user.avatar }}
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
      }
      
    </View>
  );
}

export default Home