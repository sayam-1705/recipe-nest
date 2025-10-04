import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        "2xs": "375px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        primary: {
          orange: "#FF7009",
          "orange-light": "rgba(255, 112, 9, 0.7)",
          "orange-bg": "rgba(255, 112, 9, 0.15)",
          "orange-hover": "#e6630a",
        },
        secondary: {
          "green-light": "#184F4F",
          "green-medium": "#0E4343",
          "green-dark": "#003B36",
          "green-darker": "#00312d",
        },
        neutral: {
          cream: "#FFEDE0",
          "cream-light": "#FFE0CC",
          white: "#FFFFFF",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "gentle-float": "gentleFloat 6s ease-in-out infinite",
        "subtle-pulse": "subtlePulse 4s ease-in-out infinite",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "bounce-horizontal": "bounceHorizontal 1s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out forwards",
        glow: "glow 3s ease-in-out infinite",
        "signup-fade-in": "signupFadeIn 0.6s ease-out",
        "signup-slide-down": "signupSlideDown 0.4s ease-out 0.2s both",
        sparkle: "sparkle 2s ease-in-out infinite",
        "float-up": "floatUp 3s ease-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-3px)" },
        },
        subtlePulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.02)", opacity: "0.95" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceHorizontal: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 112, 9, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(255, 112, 9, 0.4)" },
        },
        signupFadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        signupSlideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sparkle: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(1.1)",
          },
        },
        floatUp: {
          "0%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-50px)",
          },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDelay: {
        "100": "100ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
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
        ".bg-size-200": {
          "background-size": "200% 100%",
        },
        ".bg-size-300": {
          "background-size": "300% 100%",
        },
        ".hover-lift": {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
          },
        },
        ".hover-lift-subtle": {
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          },
        },
        ".text-clamp-1": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "1",
        },
        ".text-clamp-2": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "2",
        },
        ".text-clamp-3": {
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          "-webkit-line-clamp": "3",
        },
        ".backdrop-blur-glass": {
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".shimmer-text": {
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        },
      });
    },
  ],
} satisfies Config;
