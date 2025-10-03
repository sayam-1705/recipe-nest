import Link from "next/link";

const Footer = () => {
  return (
    <div id="contact">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 bg-secondary-green-dark text-neutral-cream animate-fade-in-up px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col gap-4 sm:gap-5 col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="currentColor"
              className="text-primary-orange w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            >
              <path d="M366.67-406h66.66v-188.67h-66.66V-406Zm-160-53.33q-48-23.67-77.34-68.17Q100-572 100-625q0-73.32 50.83-124.16Q201.67-800 274.94-800q11.73 0 23.55 1.81 11.83 1.81 23.18 4.52l5.33 1.34 2.67-4.67q23.66-40.33 63.66-61.67Q433.33-880 480-880t86.67 21.33q40 21.34 63.66 61.67l2.67 4.67 5.33-1.34q11.34-3 22.98-4.66 11.64-1.67 24.26-1.67 72.76 0 123.6 50.84Q860-698.32 860-625q0 53-29.33 97.5-29.34 44.5-77.34 68.17v216.66H206.67v-216.66Zm320 53.33h66.66v-188.67h-66.66V-406Zm-253.34 96h413.34v-190.33L728-521q30-15 48.33-42.5 18.34-27.5 18.34-60.5 0-46-33.5-77t-79.84-31q-9.66 0-18.66 1.67-9 1.66-18.34 4l-41.66 11.66-29-48q-15.34-25-40.16-37.83-24.82-12.83-53.5-12.83T426.5-800.5q-24.83 12.83-40.17 37.83l-29 48-42.66-11.66q-9.34-2-18.4-3.84-9.06-1.83-18.6-1.83-46.34 0-79.34 31.33-33 31.34-33 77.34 0 33 18.34 60.83Q202-534.67 232-520.33l41.33 20V-310Zm-66.66 67.33h66.66v96h413.34v-96h66.66V-80H206.67v-162.67ZM480-310Z" />
            </svg>
            <span className="font-bold text-lg sm:text-xl md:text-2xl">
              RecipeNest
            </span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base font-medium opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            <span className="transition-transform duration-300 hover:translate-x-1">
              Street Name
            </span>
            <span className="transition-transform duration-300 hover:translate-x-1">
              District - State
            </span>
            <span className="transition-transform duration-300 hover:translate-x-1">
              Country - Pin
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5 transform transition-transform duration-300">
          <h3 className="text-base sm:text-lg font-bold border-b-2 border-transparent transition-colors duration-300 pb-1">
            Quick Links
          </h3>
          <div className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base font-medium">
            <Link
              className="hover:underline transition-all duration-300 hover:text-primary-orange hover:translate-x-2"
              href="/"
            >
              How it works
            </Link>
            <Link
              className="hover:underline transition-all duration-300 hover:text-primary-orange hover:translate-x-2"
              href="/"
            >
              Recipes
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5 transform transition-transform duration-300">
          <h3 className="text-base sm:text-lg font-bold border-b-2 border-transparent transition-colors duration-300 pb-1">
            Company
          </h3>
          <div className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base font-medium">
            <Link
              className="hover:underline transition-all duration-300 hover:text-primary-orange hover:translate-x-2"
              href="/"
            >
              About
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-5 transform transition-transform duration-300">
          <h3 className="text-base sm:text-lg font-bold border-b-2 border-transparent transition-colors duration-300 pb-1">
            Follow us
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <Link
              href="/"
              className="transition-transform duration-300 hover:scale-125 hover:rotate-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-neutral-cream transition-colors duration-300 hover:text-primary-orange sm:w-6 sm:h-6"
              >
                <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
              </svg>
            </Link>
            <Link
              href="/"
              className="transition-transform duration-300 hover:scale-125 hover:rotate-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="currentColor"
                className="text-neutral-cream transition-colors duration-300 hover:text-primary-orange sm:w-6 sm:h-6"
              >
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
              </svg>
            </Link>
            <Link
              href="/"
              className="transition-transform duration-300 hover:scale-125 hover:rotate-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="text-neutral-cream transition-colors duration-300 hover:text-primary-orange sm:w-6 sm:h-6"
              >
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
              </svg>
            </Link>
            <Link
              href="/"
              className="transition-transform duration-300 hover:scale-125 hover:rotate-12"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="text-neutral-cream transition-colors duration-300 hover:text-primary-orange sm:w-6 sm:h-6"
              >
                <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-secondary-green-darker text-center text-neutral-cream italic text-xs sm:text-sm py-2 px-4">
        © 2025 RecipeNest. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
