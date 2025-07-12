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
    },
  },
  plugins: [],
} satisfies Config;
