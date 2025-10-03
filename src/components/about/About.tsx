import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="relative" id="about">
      <div className="sticky top-0 bg-secondary-green-light text-neutral-cream grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-14 z-10">
        <div className="relative flex justify-center items-center delay-300 order-2 lg:order-1 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
          <div
            className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-0 sm:right-2 md:right-4 lg:right-0 z-10 flex flex-col items-center justify-center 
                         bg-primary-orange-light backdrop-blur-glass p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl 
                         animate-gentle-float delay-800 
                         transition-all duration-300 hover:scale-105"
          >
            <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl animate-fade-in-up">
              2M+
            </span>
            <span className="tracking-tight text-xs sm:text-xs animate-fade-in-up text-center">
              Recipe published
            </span>
          </div>
          <div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-0 sm:left-2 md:left-4 lg:left-0 z-10 flex flex-col items-center justify-center 
                         bg-primary-orange-light backdrop-blur-glass p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl 
                         animate-gentle-float delay-1000 
                         transition-all duration-300 hover:scale-105"
          >
            <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl animate-fade-in-up">
              100k+
            </span>
            <span className="tracking-tight text-xs sm:text-xs animate-fade-in-up text-center">
              Active home cooks
            </span>
          </div>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src="/images/about-one.png"
              alt="About Us"
              width={500}
              height={300}
              className="rounded-xl sm:rounded-2xl shadow-lg animate-fade-in delay-500 
                       transition-all duration-500 hover:scale-105 hover:shadow-xl w-full h-auto"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 order-1 lg:order-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight animate-fade-in-up delay-200">
            Join Recipe Nest community today!
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg font-normal tracking-tight leading-6 sm:leading-7 opacity-90 animate-fade-in-up delay-400">
            Signup now and connect with fellow home cooks, share your favourite
            recipes, and discover new culinary delights.
          </p>
          <span className="animate-fade-in-up delay-600">
            <Link
              className="inline-block bg-primary-orange text-secondary-green-dark font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary-orange-hover 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 
                       focus:ring-offset-secondary-green-dark"
              href="/signup"
            >
              Signup, its free
            </Link>
          </span>
        </div>
      </div>

      <div className="relative bg-secondary-green-medium text-neutral-cream grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-14 z-20">
        <div className="flex flex-col justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 order-1 lg:order-2 delay-300">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight animate-fade-in-up delay-500">
            Share your culinary creation with others
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg font-normal tracking-tight leading-6 sm:leading-7 opacity-90 animate-fade-in-up delay-600">
            Showcase your recipes and culinary masterpieces. Inspire others and
            receive feedback from a supportive community of fellow home cooks.
          </p>
        </div>
        <div className="relative flex justify-center items-center order-2 lg:order-1 delay-200 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 right-2 sm:right-3 md:right-4 lg:right-5 z-10 animate-fade-in-up delay-700">
            <Link
              className="inline-block bg-primary-orange text-secondary-green-dark font-medium px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary-orange-hover 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:ring-offset-2 
                       focus:ring-offset-secondary-green-dark animate-subtle-pulse"
              href="/"
            >
              Share to community
            </Link>
          </div>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src="/images/about-two.png"
              alt="About Us"
              width={500}
              height={300}
              className="rounded-xl sm:rounded-2xl shadow-lg animate-fade-in delay-400 
                       transition-all duration-500 hover:scale-105 hover:shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
