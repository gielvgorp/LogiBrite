import React from 'react';
import GoogleMapReact from 'google-map-react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../constants/theme';

interface Marker {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  isCompleted: boolean;
  isSelected: boolean;
}

interface WebMapProps {
  style?: any;
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  markers: Marker[];
  onMarkerPress: (id: string) => void;
  onCalloutPress: (id: string) => void;
}

const Marker = ({ text, isCompleted, isSelected, onClick }: any) => (
  <View
    style={[
      styles.marker,
      isCompleted && styles.completedMarker,
      isSelected && styles.selectedMarker,
    ]}
    onClick={onClick}
  >
    <Text style={styles.markerText}>{text}</Text>
  </View>
);

export function WebMap({
  style,
  initialRegion,
  markers,
  onMarkerPress,
  onCalloutPress,
}: WebMapProps) {
  const defaultProps = {
    center: {
      lat: initialRegion.latitude,
      lng: initialRegion.longitude,
    },
    zoom: 11,
  };

  return (
    <View style={[styles.container, style]}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            lat={marker.coordinate.latitude}
            lng={marker.coordinate.longitude}
            text={marker.title}
            isCompleted={marker.isCompleted}
            isSelected={marker.isSelected}
            onClick={() => {
              onMarkerPress(marker.id);
              onCalloutPress(marker.id);
            }}
          />
        ))}
      </GoogleMapReact>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  marker: {
    backgroundColor: colors.warning.main,
    padding: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
  completedMarker: {
    backgroundColor: colors.success.main,
  },
  selectedMarker: {
    backgroundColor: colors.primary.main,
  },
  markerText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});