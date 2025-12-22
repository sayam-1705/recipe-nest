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
        // Futuristic Theme Colors
        neon: {
          blue: "#00F0FF",
          purple: "#B026FF",
          pink: "#FF006E",
          green: "#39FF14",
          orange: "#FF6B35",
          yellow: "#FFD60A",
        },
        cyber: {
          dark: "#0a0e27",
          darker: "#050814",
          medium: "#1a1f3a",
          light: "#2d3561",
          accent: "#4d5b9e",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          light: "rgba(255, 255, 255, 0.05)",
          dark: "rgba(0, 0, 0, 0.2)",
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
        // Futuristic Animations
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "cyber-glitch": "cyberGlitch 3s ease-in-out infinite",
        "rotate-3d": "rotate3d 20s linear infinite",
        "float-3d": "float3d 6s ease-in-out infinite",
        "glow-intense": "glowIntense 2s ease-in-out infinite",
        "slide-in-3d": "slideIn3d 0.8s ease-out forwards",
        "particle-float": "particleFloat 4s ease-in-out infinite",
        "hologram": "hologram 4s ease-in-out infinite",
        "neon-border": "neonBorder 3s ease-in-out infinite",
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
        // Futuristic Keyframes
        neonPulse: {
          "0%, 100%": {
            textShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            opacity: "1",
          },
          "50%": {
            textShadow:
              "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            opacity: "0.8",
          },
        },
        cyberGlitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        rotate3d: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        float3d: {
          "0%, 100%": { transform: "translateY(0px) translateZ(0px)" },
          "50%": { transform: "translateY(-20px) translateZ(20px)" },
        },
        glowIntense: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, inset 0 0 20px currentColor",
          },
          "50%": {
            boxShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, inset 0 0 10px currentColor",
          },
        },
        slideIn3d: {
          "0%": {
            opacity: "0",
            transform: "translateZ(-100px) translateY(50px)",
          },
          "100%": { opacity: "1", transform: "translateZ(0) translateY(0)" },
        },
        particleFloat: {
          "0%, 100%": {
            transform: "translateY(0) translateX(0) scale(1)",
            opacity: "0.6",
          },
          "50%": {
            transform: "translateY(-30px) translateX(10px) scale(1.1)",
            opacity: "1",
          },
        },
        hologram: {
          "0%, 100%": { opacity: "0.7", filter: "hue-rotate(0deg)" },
          "50%": { opacity: "1", filter: "hue-rotate(20deg)" },
        },
        neonBorder: {
          "0%, 100%": {
            borderColor: "rgba(0, 240, 255, 0.5)",
            boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
          },
          "50%": {
            borderColor: "rgba(176, 38, 255, 0.5)",
            boxShadow: "0 0 20px rgba(176, 38, 255, 0.5)",
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
        // Futuristic Utility Classes
        ".glassmorphism": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        },
        ".glassmorphism-dark": {
          background: "rgba(10, 14, 39, 0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        },
        ".neon-text": {
          textShadow:
            "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor",
        },
        ".neon-border": {
          boxShadow:
            "0 0 5px currentColor, 0 0 10px currentColor, inset 0 0 5px currentColor",
        },
        ".cyber-grid": {
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        },
        ".holographic": {
          background:
            "linear-gradient(45deg, #00F0FF, #B026FF, #FF006E, #39FF14)",
          backgroundSize: "300% 300%",
          animation: "hologram 4s ease-in-out infinite",
        },
        ".transform-3d": {
          transformStyle: "preserve-3d",
          perspective: "1000px",
        },
        ".hover-glow": {
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor",
            transform: "scale(1.05)",
          },
        },
      });
    },
  ],
} satisfies Config;
