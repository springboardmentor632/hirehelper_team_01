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
    },
  },

  plugins: [],
};
