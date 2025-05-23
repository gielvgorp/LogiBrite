import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

type StatusType = 'pending' | 'in_progress' | 'completed' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'small' | 'medium' | 'large';
}

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  // Define status-specific styles
  const statusStyles = {
    pending: {
      backgroundColor: colors.warning.light,
      textColor: colors.warning.dark,
    },
    in_progress: {
      backgroundColor: colors.primary.light,
      textColor: colors.primary.dark,
    },
    completed: {
      backgroundColor: colors.success.light,
      textColor: colors.success.dark,
    },
    failed: {
      backgroundColor: colors.error.light,
      textColor: colors.error.dark,
    },
  };

  // Get the appropriate styles for the current status
  const currentStatusStyle = statusStyles[status];
  
  // Determine size-specific styles
  const sizeStyles = {
    small: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
      fontSize: 10,
    },
    medium: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      fontSize: 12,
    },
    large: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      fontSize: 14,
    },
  };

  const currentSizeStyle = sizeStyles[size];

  // Format the status text to be more user-friendly
  const getStatusText = (status: StatusType) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return status;
    }
  };

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: currentStatusStyle.backgroundColor,
          paddingVertical: currentSizeStyle.paddingVertical,
          paddingHorizontal: currentSizeStyle.paddingHorizontal,
          borderRadius: currentSizeStyle.borderRadius,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: currentStatusStyle.textColor,
            fontSize: currentSizeStyle.fontSize,
          },
        ]}
      >
        {getStatusText(status)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});