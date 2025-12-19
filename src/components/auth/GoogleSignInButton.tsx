"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            config: {
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              width?: string;
            }
          ) => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  onSuccess: (credential: string) => void;
  onError: (error: string) => void;
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
}

export default function GoogleSignInButton({
  onSuccess,
  onError,
  text = "continue_with",
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      script.onerror = () => {
        onError("Failed to load Google Sign-In");
      };
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google || !buttonRef.current) return;

      const clientId = process.env.GOOGLE_CLIENT_ID;
      if (!clientId) {
        onError("Google Client ID not configured. Please set GOOGLE_CLIENT_ID in your environment variables.");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: { credential: string }) => {
          onSuccess(response.credential);
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        text: text,
        shape: "rectangular",
        width: "100%",
      });
    };

    loadGoogleScript();
  }, [onSuccess, onError, text]);

  return <div ref={buttonRef} className="w-full"></div>;
}
