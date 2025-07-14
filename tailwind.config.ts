import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-orange": "#FF7009",
        "color-light-green": "rgba(24, 79, 79, 1)",
        "color-medium-green" : "rgba(14, 67, 67, 1)",
        "color-dark-green": "#003B36",
        "color-white": "#FFEDE0",
        "color-cream": "FFE0CC",
        "color-orange-blur": "rgba(255, 112, 9, 0.7)",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
        "gentle-float": "gentle-float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-horizontal": "bounce-horizontal 1s ease-in-out infinite",
        "subtle-scale": "subtle-scale 4s ease-in-out infinite",
        "gentle-glow": "gentle-glow 3s ease-in-out infinite",
        "parallax-float": "parallax-float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".carousel-scroll": {
          "scroll-behavior": "smooth",
        },
      });
    },
  ],
} satisfies Config;
