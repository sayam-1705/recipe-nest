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
        "color-light-green": "#54E537",
        "color-dark-green": "#003B36",
        "color-medium-green": "#003B36",
        "color-white": "#FFEDE0",
        "color-cream": "FFE0CC",
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
        "gentle-float": "gentle-float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-horizontal": "bounce-horizontal 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.carousel-scroll': {
          'scroll-behavior': 'smooth',
        },
      });
    },
  ],
} satisfies Config;
