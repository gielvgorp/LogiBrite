import { AppHeader } from '@/components/AppHeader';
import RouteOfToday from '@/components/Home/RouteOfToday';
import { routeService } from '@/services/routeService';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const Routes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      const routes = await routeService.getRoutes();
      setRoutes(routes);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
 
  return (
    <View className='flex-1'>
      <AppHeader title='Routes' />
      {
        isLoading ? <ActivityIndicator size="large" className='mt-5' /> : 
        <View className='mt-5 px-6'>
          <View className='flex-col'>
            <Text className='font-bold text-2xl text-black'>Jouw vorige routes</Text>
            <View className='fle-col w-full mt-1 space-x-5'>
              {
                routes &&
                routes.map((route, index) => (
                  <View className='pb-4' key={index}>
                     <RouteOfToday
                      id={route.id}
                      routeDate={new Date(route.date).toLocaleDateString('nl-NL')}
                      amountOfStops={route.stops.length}
                      routeName={route.name}
                      routeTime="1u 45m"
                    />
                  </View>
                   
                ))
              }
            </View>
          </View>
        </View>
      }
    </View>
  )
}

export default Routes