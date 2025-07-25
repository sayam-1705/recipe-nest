import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-14 py-3 bg-neutral-white shadow-sm transition-all duration-500 hover:shadow-md">
      <Link
        className="flex items-center group transition-all duration-300 hover:scale-105 animate-gentle-float"
        href="/"
      >
        <svg
          className="transition-transform duration-500 fill-primary-orange group-hover:rotate-12"
          xmlns="http://www.w3.org/2000/svg"
          height="50px"
          viewBox="0 -960 960 960"
          width="50px"
          fill="currentColor"
        >
          <path d="M366.67-406h66.66v-188.67h-66.66V-406Zm-160-53.33q-48-23.67-77.34-68.17Q100-572 100-625q0-73.32 50.83-124.16Q201.67-800 274.94-800q11.73 0 23.55 1.81 11.83 1.81 23.18 4.52l5.33 1.34 2.67-4.67q23.66-40.33 63.66-61.67Q433.33-880 480-880t86.67 21.33q40 21.34 63.66 61.67l2.67 4.67 5.33-1.34q11.34-3 22.98-4.66 11.64-1.67 24.26-1.67 72.76 0 123.6 50.84Q860-698.32 860-625q0 53-29.33 97.5-29.34 44.5-77.34 68.17v216.66H206.67v-216.66Zm320 53.33h66.66v-188.67h-66.66V-406Zm-253.34 96h413.34v-190.33L728-521q30-15 48.33-42.5 18.34-27.5 18.34-60.5 0-46-33.5-77t-79.84-31q-9.66 0-18.66 1.67-9 1.66-18.34 4l-41.66 11.66-29-48q-15.34-25-40.16-37.83-24.82-12.83-53.5-12.83T426.5-800.5q-24.83 12.83-40.17 37.83l-29 48-42.66-11.66q-9.34-2-18.4-3.84-9.06-1.83-18.6-1.83-46.34 0-79.34 31.33-33 31.34-33 77.34 0 33 18.34 60.83Q202-534.67 232-520.33l41.33 20V-310Zm-66.66 67.33h66.66v96h413.34v-96h66.66V-80H206.67v-162.67ZM480-310Z" />
        </svg>
        <span className="font-bold text-2xl text-secondary-green-dark ml-2 transition-all duration-500 group-hover:text-primary-orange shimmer-text">
          RecipeNest
        </span>
      </Link>
      <div className="flex gap-7 text-lg font-medium">
        <NavLink href="/" delay={400}>
          Home
        </NavLink>
        <NavLink href="/" delay={500}>
          How it works
        </NavLink>
        <NavLink href="/" delay={600}>
          Menu
        </NavLink>
        <NavLink href="/" delay={700}>
          About
        </NavLink>
        <NavLink href="/" delay={800}>
          Contact
        </NavLink>
      </div>
      <div className="flex gap-4 font-medium text-base animate-fade-in-up delay-800">
        <Link
          className="border border-secondary-green-dark px-4 py-1.5 rounded-3xl transition-all duration-500 hover:bg-secondary-green-dark hover:text-neutral-white hover:scale-105 hover:shadow-lg active:scale-95 transform"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="border border-primary-orange px-4 py-1.5 rounded-3xl bg-primary-orange transition-all duration-500 hover:bg-primary-orange-hover hover:border-primary-orange-hover hover:scale-105 hover:shadow-lg active:scale-95 text-neutral-white transform"
          href="/signup"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
