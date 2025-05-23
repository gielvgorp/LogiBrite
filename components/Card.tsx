import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export function Card({ 
  children, 
  style, 
  elevation = 'medium',
  padding = 'medium' 
}: CardProps) {
  // Get shadow styles based on elevation
  const getShadowStyle = () => {
    switch (elevation) {
      case 'none':
        return {};
      case 'low':
        return {
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        };
      case 'high':
        return {
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5,
        };
      case 'medium':
      default:
        return {
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3,
        };
    }
  };

  // Get padding based on size
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none':
        return { padding: 0 };
      case 'small':
        return { padding: 8 };
      case 'large':
        return { padding: 24 };
      case 'medium':
      default:
        return { padding: 16 };
    }
  };

  return (
    <View 
      style={[
        styles.card,
        getShadowStyle(),
        getPaddingStyle(),
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: colors.shadow,
    marginVertical: 8,
  },
});