import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
