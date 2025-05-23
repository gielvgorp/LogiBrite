// Color palette for the app
export const colors = {
  primary: {
    light: '#4D89E3',
    main: '#0062CC',
    dark: '#004B9A',
  },
  secondary: {
    light: '#8D959D',
    main: '#6C757D',
    dark: '#495057',
  },
  success: {
    light: '#71DD8A',
    main: '#28A745',
    dark: '#1E7E34',
  },
  warning: {
    light: '#FFB74C',
    main: '#FD7E14',
    dark: '#C56200',
  },
  error: {
    light: '#F6706E',
    main: '#DC3545',
    dark: '#BD2130',
  },
  background: {
    default: '#F8F9FA',
    paper: '#FFFFFF',
    dark: '#343A40',
  },
  text: {
    primary: '#212529',
    secondary: '#6C757D',
    disabled: '#ADB5BD',
    light: '#F8F9FA',
    dark: '#212529',
  },
  white: '#FFFFFF',
  black: '#000000',
  shadow: '#000000',
  divider: '#DEE2E6',
  
  // Status colors
  status: {
    active: '#0062CC',
    delivered: '#28A745',
    pending: '#FD7E14',
    failed: '#DC3545',
  },
};

// Typography
export const typography = {
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 32,
  },
  fontWeights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

// Shadows
export const shadows = {
  small: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  large: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
};