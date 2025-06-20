import { AppHeader } from '@/components/AppHeader';
import { routeService } from '@/services/routeService';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';

const markers = [
  { latitude: 51.4416, longitude: 5.4697, title: 'Eindhoven' },
  { latitude: 51.9244, longitude: 4.4777, title: 'Rotterdam' },
  { latitude: 52.3791, longitude: 4.8994, title: 'Amsterdam' }
];

export default function Index() {
const [addresses, setAddresses] = useState<Coordinates[]>([]);
const { routeId } = useLocalSearchParams();
const [isLoading, setIsLoading] = useState(true);
const [depotCoords, setDepotCoords] = useState<Coordinates>();

useEffect(() => {
  const fetchData = async () => {
      console.log(routeId);
      const route = await routeService.getRouteById(parseInt(routeId.toString()));
      const stops = route?.stops;

      if (!stops) return;

      const addressList: Coordinates[] = [];

      for (const stop of stops) {
          const fullAddress = `${stop.customer.address}, ${stop.customer.zipCode} ${stop.customer.city}`;
          const coords = await routeService.getCoordinatesFromAddress(fullAddress, stop.stopNumber.toString());
          
          if (coords && coords.latitude && coords.longitude) {
              addressList.push(coords);
          }
      }

      const depot = await routeService.getCoordinatesFromAddress(route.depotLocation);
      setDepotCoords(depot);

      setAddresses(addressList);
      setIsLoading(false);
  };

    fetchData();
}, [routeId]);

  return (
   
      <View className='flex-1'>
       <AppHeader title={`Route kaart`} showBackButton={true} />
       {
        isLoading ? 
        <ActivityIndicator className='mt-5' size="large" /> :
          <MapView
          style={styles.map}
          region={
      addresses.length > 0
        ? {
            latitude: addresses[0].latitude,
            longitude: addresses[0].longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }
        : {
            latitude: 52.0,
            longitude: 5.0,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }
    }
    mapType='standard'
        >
          {/* OpenStreetMap tiles */}
          <UrlTile
            urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />

          {
            depotCoords &&
             <Marker
                key={10}
                coordinate={{ latitude: depotCoords.latitude, longitude: depotCoords.longitude }}
                title="Depot"
                pinColor='#007AFF'
              />
          }

          {/* Markers */}
          {addresses.map((m, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: m.latitude, longitude: m.longitude }}
              title={m.title}
            />
          ))}

          {addresses.length > 0 && depotCoords && (
            <Polyline
              coordinates={[
                { latitude: depotCoords.latitude, longitude: depotCoords.longitude }, // Depot
                { latitude: addresses[0].latitude, longitude: addresses[0].longitude } // Eerste stop
              ]}
              strokeColor="#00AAFF"
              strokeWidth={3}
            />
          )}


          {/* Lijnen tussen markers */}
          <Polyline
            coordinates={addresses.map(m => ({
              latitude: m.latitude,
              longitude: m.longitude
            }))}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
        </MapView>
       }
    </View>    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: "100%"
  }
});
