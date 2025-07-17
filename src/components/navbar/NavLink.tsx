import Link from "next/link";

const NavLink = ({
  children,
  href,
  delay = 0,
}: {
  children: React.ReactNode;
  href: string;
  delay?: number;
}) => {
  return (
    <Link
      className={`relative transition-all duration-500 hover:text-primary-orange hover:scale-105 transform hover:-translate-y-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-orange after:transition-all after:duration-500 hover:after:w-full animate-fade-in-up delay-${delay}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
