import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-14 py-3 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <Link
        className="flex items-center group transition-all duration-300 hover:scale-105"
        href="/"
      >
        <Image
          src="/icons/chef-hat.svg"
          alt="chef-hat"
          width={50}
          height={50}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
        <span className="font-bold text-2xl text-color-dark-green ml-2 transition-colors duration-300 group-hover:text-color-orange">
          RecipeNest
        </span>
      </Link>
      <div className="flex gap-7 text-lg font-medium">
        <Link
          className="relative transition-all duration-300 hover:text-color-orange hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-color-orange after:transition-all after:duration-300 hover:after:w-full"
          href="/"
        >
          Home
        </Link>
        <Link
          className="relative transition-all duration-300 hover:text-color-orange hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-color-orange after:transition-all after:duration-300 hover:after:w-full"
          href="/"
        >
          Menu
        </Link>
        <Link
          className="relative transition-all duration-300 hover:text-color-orange hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-color-orange after:transition-all after:duration-300 hover:after:w-full"
          href="/"
        >
          How it works
        </Link>
        <Link
          className="relative transition-all duration-300 hover:text-color-orange hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-color-orange after:transition-all after:duration-300 hover:after:w-full"
          href="/"
        >
          About
        </Link>
        <Link
          className="relative transition-all duration-300 hover:text-color-orange hover:scale-105 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-color-orange after:transition-all after:duration-300 hover:after:w-full"
          href="/"
        >
          Contact
        </Link>
      </div>
      <div className="flex gap-4 font-medium text-base">
        <Link
          className="border-[1px] border-color-dark-green px-4 py-1.5 rounded-3xl transition-all duration-300 hover:bg-color-dark-green hover:text-white hover:scale-105 hover:shadow-lg active:scale-95"
          href="/login"
        >
          Login
        </Link>
        <Link
          className="border-[1px] border-color-orange px-4 py-1.5 rounded-3xl bg-color-orange transition-all duration-300 hover:bg-orange-600 hover:border-orange-600 hover:scale-105 hover:shadow-lg active:scale-95 text-white"
          href="/signup"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
