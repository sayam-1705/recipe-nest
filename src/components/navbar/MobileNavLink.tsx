"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const NavLink = ({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick: () => void;
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
    onClick();
  };

  return (
    <Link
      className={`flex items-center px-4 py-3 text-gray-700 hover:text-primary-orange hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium text-base`}
      href={href}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
