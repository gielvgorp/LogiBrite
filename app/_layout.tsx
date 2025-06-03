import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
  return <>
    <Stack
      screenOptions={{
        gestureEnabled: false,
        animation: 'none'
      }}
    >
       <Stack.Screen 
        name="index"
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="(tabs)"
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="route/[id]"
        options={{headerShown: false}}
      />
       <Stack.Screen 
        name="route/[routeId]/stop/[stopId]"
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="route/laden/[id]"
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="route/[routeId]/completeRoute/Index"
        options={{headerShown: false}}
      />
    </Stack>
  </>;
}
