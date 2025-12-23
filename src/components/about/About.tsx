import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <div className="relative" id="about">
      <div className="relative glassmorphism-dark border border-neon-blue/20 text-white grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-14 z-10 overflow-hidden">
        {/* Animated gradient orb */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full blur-3xl animate-float-3d"></div>
        
        <div className="relative flex justify-center items-center delay-300 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] z-10">
          <div
            className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-0 sm:right-2 md:right-4 lg:right-0 z-10 flex flex-col items-center justify-center 
                         glassmorphism neon-border p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl 
                         animate-gentle-float delay-800 
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl animate-fade-in-up bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
              2M+
            </span>
            <span className="tracking-tight text-xs sm:text-xs animate-fade-in-up text-center text-gray-300">
              Recipe published
            </span>
          </div>
          <div
            className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-0 sm:left-2 md:left-4 lg:left-0 z-10 flex flex-col items-center justify-center 
                         glassmorphism neon-border p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl 
                         animate-gentle-float delay-1000 
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(176,38,255,0.5)]"
          >
            <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl animate-fade-in-up bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              100k+
            </span>
            <span className="tracking-tight text-xs sm:text-xs animate-fade-in-up text-center text-gray-300">
              Active home cooks
            </span>
          </div>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Image
              src="/images/about-one.png"
              alt="About Us"
              width={500}
              height={300}
              className="rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.3)] animate-fade-in delay-500 
                       transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(0,240,255,0.5)] w-full h-auto border border-neon-blue/30"
            />
          </div>
        </div>
        <div className="relative flex flex-col justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight animate-fade-in-up delay-200 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Join Recipe Nest community today!
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg font-normal tracking-tight leading-6 sm:leading-7 text-gray-300 animate-fade-in-up delay-400">
            Signup now and connect with fellow home cooks, share your favourite
            recipes, and discover new culinary delights.
          </p>
          <span className="animate-fade-in-up delay-600">
            <Link
              className="inline-block bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-blue neon-border"
              href="/signup"
            >
              Signup, it&apos;s free
            </Link>
          </span>
        </div>
      </div>

      <div className="relative glassmorphism-dark border border-neon-purple/20 text-white grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-14 z-20 overflow-hidden">
        {/* Animated gradient orb */}
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-full blur-3xl animate-float-3d delay-500"></div>
        
        <div className="relative flex flex-col justify-center gap-3 order-2 lg:order-1 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 delay-300 z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight animate-fade-in-up delay-500 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
            Share your culinary creation with others
          </h1>
          <p className="text-sm sm:text-base md:text-base lg:text-lg font-normal tracking-tight leading-6 sm:leading-7 text-gray-300 animate-fade-in-up delay-600">
            Showcase your recipes and culinary masterpieces. Inspire others and
            receive feedback from a supportive community of fellow home cooks.
          </p>
        </div>
        <div className="relative flex justify-center items-center delay-200 order-1 lg:order-2 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] z-10">
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 right-2 sm:right-3 md:right-4 lg:right-5 z-10 animate-fade-in-up delay-700">
            <Link
              className="inline-block bg-gradient-to-r from-neon-purple to-neon-pink text-white font-medium px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base rounded-full 
                       transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,110,0.6)] 
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-pink neon-border animate-neon-pulse"
              href="#contact"
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
              className="rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(176,38,255,0.3)] animate-fade-in delay-400 
                       transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(176,38,255,0.5)] w-full h-auto border border-neon-purple/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
