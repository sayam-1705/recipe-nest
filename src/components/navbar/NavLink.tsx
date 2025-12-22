"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const pendingScrollRef = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === "/" && pendingScrollRef.current) {
      const targetId = pendingScrollRef.current;
      pendingScrollRef.current = null;

      const timeoutId = setTimeout(() => {
        scrollToElement(targetId);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  const scrollToElement = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);

      if (pathname !== "/") {
        pendingScrollRef.current = targetId;
        router.push("/");
      } else {
        scrollToElement(targetId);
      }
    }
  };

  return (
    <Link
      className={`relative px-4 py-2 rounded-lg transition-all duration-500 hover:scale-105 transform group glassmorphism border border-transparent hover:border-neon-blue/50 animate-fade-in-up delay-75`}
      href={href}
      onClick={handleClick}
    >
      <span className="relative z-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-neon-blue group-hover:to-neon-purple transition-all duration-300">
        {children}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/10 group-hover:to-neon-purple/10 rounded-lg transition-all duration-300"></div>
    </Link>
  );
};

export default NavLink;
