"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const NavLink = ({
  children,
  href,
  delay = 0,
}: {
  children: React.ReactNode;
  href: string;
  delay?: number;
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
      className={`relative transition-all duration-500 hover:text-primary-orange hover:scale-105 transform hover:-translate-y-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-orange after:transition-all after:duration-500 hover:after:w-full animate-fade-in-up delay-${delay}`}
      href={href}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
