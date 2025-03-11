// Modern color theme for the diet app
export const colors = {
  // Primary colors
  primary: {
    light: "#6366F1", // Indigo-500
    DEFAULT: "#4F46E5", // Indigo-600
    dark: "#4338CA", // Indigo-700
  },

  // Secondary colors
  secondary: {
    light: "#10B981", // Emerald-500
    DEFAULT: "#059669", // Emerald-600
    dark: "#047857", // Emerald-700
  },

  // Accent colors
  accent: {
    light: "#F97316", // Orange-500
    DEFAULT: "#EA580C", // Orange-600
    dark: "#C2410C", // Orange-700
  },

  // Neutral colors
  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  // Semantic colors
  success: "#10B981", // Emerald-500
  warning: "#F59E0B", // Amber-500
  error: "#EF4444", // Red-500
  info: "#3B82F6", // Blue-500

  // Common colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

// Theme configuration
export const theme = {
  colors,

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },

  // Spacing
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
  },

  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    DEFAULT: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};

export default theme;
