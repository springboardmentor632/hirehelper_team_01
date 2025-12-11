// hirehelper_theme.js
// Design tokens exported as a JavaScript module for use in any project

const HireHelperTheme = {
  colors: {
    // Backgrounds & surfaces
    backgroundApp: "#D8FFBB",        // Pale green app background
    backgroundSurface: "#FFFFFF",    // White surface (cards, modals, inputs)
    backgroundHighlight: "#C7F5A5",  // Active nav, selected cards

    // Text
    textPrimary: "#18181B",          // Main text
    textSecondary: "#6B7280",        // Muted/caption text

    // Brand / Actions
    brandPrimary: "#334155",         // Primary CTA (dark olive)
    actionAccept: "#42B72A",         // Success/Accept (bright green)
    actionLink: "#1877F2",           // "Log in", "Resend" links (blue)
    actionDecline: "#FFFFFF",        // Decline button bg/text

    // Borders
    borderDefault: "#E4E4E7"         // Light borders and dividers
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: {
      base: "16px",
      h1: "2rem",     // Page title
      h2: "1.5rem"    // Section title
    },
    fontWeight: {
      bold: 700,
      semibold: 600,
      regular: 400
    }
  },

  structure: {
    borderRadius: {
      md: "8px",       // Buttons, inputs, cards
      lg: "12px"
    },
    boxShadow: {
      card: "0 4px 10px rgba(0, 0, 0, 0.1)"  // Soft card shadow
    }
  },

  // Tailwind helper mapping (optional if you want to extend Tailwind)
  tailwind: {
    colors: {
      "bg-app": "#D8FFBB",
      "bg-surface": "#FFFFFF",
      "bg-highlight": "#C7F5A5",
      "text-primary": "#18181B",
      "text-secondary": "#6B7280",
      "brand-primary": "#334155",
      "action-accept": "#42B72A",
      "action-link": "#1877F2",
      "action-decline": "#FFFFFF",
      "border-default": "#E4E4E7"
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"]
    },
    borderRadius: {
      md: "8px",
      lg: "12px"
    },
    boxShadow: {
      card: "0 4px 10px rgba(0, 0, 0, 0.1)"
    }
  }
};

export default HireHelperTheme;
