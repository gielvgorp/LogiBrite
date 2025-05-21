import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
            name="Home"
            options={{
                title: 'Home',
                headerShown: false,
            }}
        />
        <Tabs.Screen 
            name="Routes"
            options={{
                title: 'Routes',
                headerShown: false
            }}
        />
        <Tabs.Screen 
            name="Profile"
            options={{
                title: 'Profiel',
                headerShown: false
            }}
        />
    </Tabs>
  )
}

export default _layout