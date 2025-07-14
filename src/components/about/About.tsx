import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-color-light-green text-white grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 p-8 lg:p-14 h-screen z-10">
        <div className="flex flex-col justify-center gap-8 lg:gap-10 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight animate-fade-in-up delay-200">
            Join Recipe Nest community today!
          </h1>
          <p className="text-base lg:text-lg font-normal tracking-tight leading-7 opacity-90 animate-fade-in-up delay-400">
            Signup now and connect with fellow home cooks, share your favourite
            recipes, and discover new culinary delights.
          </p>
          <span className="animate-fade-in-up delay-600">
            <Link
              className="inline-block bg-color-orange text-color-dark-green font-medium px-6 py-3 rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-500 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 
                       focus:ring-offset-color-dark-green"
              href="/"
            >
              Signup, its free
            </Link>
          </span>
        </div>
        <div className="relative flex justify-center items-center animate-scale-in delay-300">
          <div
            className="absolute top-10 right-0 z-10 flex flex-col items-center justify-center 
                         bg-color-orange-blur backdrop-blur-sm p-4 rounded-2xl 
                         animate-gentle-float delay-800 
                         transition-all duration-300 hover:scale-105"
          >
            <span className="font-bold text-3xl lg:text-4xl">2M+</span>
            <span className="tracking-tight text-xs lg:text-sm">
              Recipe published
            </span>
          </div>
          <div
            className="absolute bottom-10 left-0 z-10 flex flex-col items-center justify-center 
                         bg-color-orange-blur backdrop-blur-sm p-4 rounded-2xl 
                         animate-gentle-float delay-1000 
                         transition-all duration-300 hover:scale-105"
          >
            <span className="font-bold text-3xl lg:text-4xl">100k+</span>
            <span className="tracking-tight text-xs lg:text-sm">
              Active home cooks
            </span>
          </div>
          <Image
            src="/images/about-one.png"
            alt="About Us"
            width={500}
            height={300}
            className="rounded-2xl shadow-lg animate-fadeIn delay-500 
                     transition-all duration-500 hover:scale-105 hover:shadow-xl"
          />
        </div>
      </div>
      
      <div className="relative bg-color-medium-green text-white grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 p-8 lg:p-14 h-screen z-20">
        <div className="relative flex justify-center items-center order-2 lg:order-1 animate-scale-in delay-200">
          <div className="absolute bottom-5 right-5 z-10 animate-fade-in-up delay-700">
            <Link
              className="inline-block bg-color-orange text-color-dark-green font-medium px-6 py-3 rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-orange-500 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 
                       focus:ring-offset-color-dark-green animate-subtle-pulse"
              href="/"
            >
              Share to community
            </Link>
          </div>
          <Image
            src="/images/about-two.png"
            alt="About Us"
            width={500}
            height={300}
            className="rounded-2xl shadow-lg animate-fadeIn delay-400 
                     transition-all duration-500 hover:scale-105 hover:shadow-xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 lg:gap-10 order-1 lg:order-2 animate-fade-in-up delay-300">
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight animate-fade-in-up delay-500">
            Share your culinary creation with others
          </h1>
          <p className="text-base lg:text-lg font-normal tracking-tight leading-7 opacity-90 animate-fade-in-up delay-600">
            Showcase your recipes and culinary masterpieces. Inspire others and
            receive feedback from a supportive community of fellow home cooks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
