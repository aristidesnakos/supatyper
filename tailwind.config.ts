import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: '#FCFCED',    // Background cream
        secondary: '#3E3628',  // Dark brown text
        accent: '#F9621C',     // Orange for accuracy/trophy
        blue: '#4169E1',       // Blue for links and text
        buttonBlue: '#7B9EFF', // Light blue for buttons
        beige: '#DED6CA',      // Light beige for borders
        gray: '#A29D8E',       // Soft gray
        error: '#EF4444',      // Red for errors
        // SupaTyper custom colors
        "supatyper-background": "#F5F5DC",      // Light beige background
        "supatyper-backgroundAlt": "#F8F8E8",   // Slightly lighter beige
        "supatyper-backgroundLight": "#FCFCF5", // Very light beige
        "supatyper-darkBrown": "#3E3628",       // Dark brown text
        "supatyper-oliveBrown": "#6B5B45",      // Olive brown text
        "supatyper-mutedBrown": "#A29D8E",      // Muted brown
        "supatyper-lightBeige": "#DED6CA",      // Light beige
        "supatyper-brightBlue": "#7B9EFF",      // Bright blue for buttons
        "supatyper-vibrantOrange": "#F9621C",   // Vibrant orange
        "supatyper-lightGray": "#F0F0F0",       // Light gray
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
