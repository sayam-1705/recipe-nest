import Link from "next/link";

const FuturisticFooter = () => {
  return (
    <footer id="contact" className="relative mt-20">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
      
      <div className="glassmorphism-dark backdrop-blur-xl border-t border-neon-blue/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="flex flex-col gap-5 col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <svg
                    className="relative w-10 h-10 transition-transform duration-500 group-hover:rotate-12"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      fill="url(#footerGradient)"
                    />
                    <defs>
                      <linearGradient id="footerGradient" x1="2" y1="2" x2="22" y2="12">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop offset="100%" stopColor="#B026FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                  RecipeNest
                </span>
              </div>
              <div className="flex flex-col gap-2 text-gray-400 font-medium">
                <span className="hover:text-neon-blue transition-colors duration-300 cursor-default">
                  📍 Kolkata
                </span>
                <span className="hover:text-neon-purple transition-colors duration-300 cursor-default">
                  West Bengal, India
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                Discover amazing recipes with cutting-edge technology and futuristic design.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-white relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-neon-blue to-transparent"></span>
              </h3>
              <div className="flex flex-col gap-3 text-gray-400 font-medium">
                <Link
                  className="hover:text-neon-blue transition-all duration-300 hover:translate-x-2 inline-block"
                  href="#how-it-works"
                >
                  → How it works
                </Link>
                <Link
                  className="hover:text-neon-purple transition-all duration-300 hover:translate-x-2 inline-block"
                  href="#menu"
                >
                  → Recipes
                </Link>
                <Link
                  className="hover:text-neon-pink transition-all duration-300 hover:translate-x-2 inline-block"
                  href="/search"
                >
                  → Search
                </Link>
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-white relative inline-block">
                Company
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-neon-purple to-transparent"></span>
              </h3>
              <div className="flex flex-col gap-3 text-gray-400 font-medium">
                <Link
                  className="hover:text-neon-blue transition-all duration-300 hover:translate-x-2 inline-block"
                  href="#about"
                >
                  → About
                </Link>
                <Link
                  className="hover:text-neon-purple transition-all duration-300 hover:translate-x-2 inline-block"
                  href="#contact"
                >
                  → Contact
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-bold text-white relative inline-block">
                Follow Us
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-neon-pink to-transparent"></span>
              </h3>
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href="https://www.facebook.com/sayam.1705"
                  className="w-10 h-10 rounded-lg glassmorphism border border-neon-blue/30 flex items-center justify-center hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                    className="text-neon-blue"
                  >
                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/sayam.1705/"
                  className="w-10 h-10 rounded-lg glassmorphism border border-neon-purple/30 flex items-center justify-center hover:border-neon-purple hover:shadow-[0_0_20px_rgba(176,38,255,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-neon-purple"
                  >
                    <path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                  </svg>
                </Link>
                <Link
                  href="https://x.com/sayam_1705"
                  className="w-10 h-10 rounded-lg glassmorphism border border-neon-pink/30 flex items-center justify-center hover:border-neon-pink hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  target="_blank"
                  aria-label="Twitter/X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                    className="text-neon-pink"
                  >
                    <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                  </svg>
                </Link>
                <Link
                  href="https://www.youtube.com/@sayam1705"
                  className="w-10 h-10 rounded-lg glassmorphism border border-neon-orange/30 flex items-center justify-center hover:border-neon-orange hover:shadow-[0_0_20px_rgba(255,107,53,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                    className="text-neon-orange"
                  >
                    <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-neon-blue/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2025 RecipeNest. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="hover:text-neon-blue transition-colors">
                  Privacy Policy
                </button>
                <span className="text-gray-700">•</span>
                <button className="hover:text-neon-purple transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-30"></div>
    </footer>
  );
};

export default FuturisticFooter;
