import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        navy: { 950: "#000A26", 900: "#001038", 800: "#0B2257", 700: "#07577E" },
        brand: {
          // Official brand palette (Sarng Infotech Brand Guidelines v1.0)
          blue: "#1261EB",
          royal: "#1261EB",
          cyan: "#00A5F5",
          teal: "#00B8A0",
          deepteal: "#07577E",
          // Supporting accents (use sparingly)
          green: "#12B886",
          purple: "#7C3AED",
          pink: "#DB2777",
          orange: "#F97316",
        },
        ink: { DEFAULT: "#0F172A", soft: "#475569", mute: "#64748B" },
        surface: { DEFAULT: "#F5F7FA", line: "#E3E8F0" },
      },
      fontFamily: {
        sans: ["Poppins", "Montserrat", "system-ui", "sans-serif"],
        display: ["Poppins", "Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,.04), 0 8px 24px -8px rgba(15,23,42,.10)",
        lift: "0 2px 4px rgba(15,23,42,.05), 0 20px 40px -12px rgba(18,97,235,.22)",
        glow: "0 10px 30px -10px rgba(18,97,235,.5)",
      },
      borderRadius: { "4xl": "2rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "pulse-dot": { "0%,100%": { opacity: ".4" }, "50%": { opacity: "1" } },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
