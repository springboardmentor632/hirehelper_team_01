import HireHelperTheme from "./hirehelper_theme.js";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        ...HireHelperTheme.tailwind.colors,
      },

      fontFamily: {
        ...HireHelperTheme.tailwind.fontFamily,
      },

      borderRadius: {
        ...HireHelperTheme.tailwind.borderRadius,
      },

      boxShadow: {
        ...HireHelperTheme.tailwind.boxShadow,
      },

      fontSize: {
        base: HireHelperTheme.typography.fontSize.base,
        h1: HireHelperTheme.typography.fontSize.h1,
        h2: HireHelperTheme.typography.fontSize.h2,
      },

      fontWeight: {
        bold: HireHelperTheme.typography.fontWeight.bold,
        semibold: HireHelperTheme.typography.fontWeight.semibold,
        regular: HireHelperTheme.typography.fontWeight.regular,
      },

      keyframes: {
                // Defines the movement of the sliding bar
                'slide-progress': {
                    // Starts the bar 100% off the left edge
                    '0%': { transform: 'translateX(-100%)' },
                    // Midway point, moves the bar fully across the container (400% is safe for a 25% width bar)
                    '50%': { transform: 'translateX(400%)' }, 
                    // Returns to the start to loop seamlessly
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                // Applies the keyframes: 2s duration, linear speed, infinite repetition
                'slide-progress': 'slide-progress 2s linear infinite',
            }
    },
  },

  plugins: [],
};
