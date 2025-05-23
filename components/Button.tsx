import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  View,
  ViewStyle,
  TextStyle 
} from 'react-native';
import { colors } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  // Configure styles based on variant
  const getVariantStyles = (): { backgroundColor: string; textColor: string; borderColor?: string } => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary.main,
          textColor: colors.white,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary.main,
          textColor: colors.white,
        };
      case 'success':
        return {
          backgroundColor: colors.success.main,
          textColor: colors.white,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning.main,
          textColor: colors.text.dark,
        };
      case 'danger':
        return {
          backgroundColor: colors.error.main,
          textColor: colors.white,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          textColor: colors.primary.main,
          borderColor: colors.primary.main,
        };
      default:
        return {
          backgroundColor: colors.primary.main,
          textColor: colors.white,
        };
    }
  };

  // Configure styles based on size
  const getSizeStyles = (): { 
    paddingVertical: number; 
    paddingHorizontal: number;
    fontSize: number;
    height: number;
  } => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          fontSize: 12,
          height: 32,
        };
      case 'large':
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16,
          height: 54,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
          height: 44,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        { 
          backgroundColor: variantStyles.backgroundColor,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          height: sizeStyles.height,
          opacity: disabled ? 0.6 : 1,
          width: fullWidth ? '100%' : undefined,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor: variantStyles.borderColor,
        },
        style,
      ]}
    >
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator 
            color={variant === 'outline' ? variantStyles.textColor : colors.white} 
            size="small" 
          />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text
              style={[
                styles.text,
                { 
                  color: variantStyles.textColor,
                  fontSize: sizeStyles.fontSize,
                },
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
});