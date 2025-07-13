const HowItWorks = () => {
  return (
    <div className="bg-color-dark-green flex flex-col items-center text-white py-16 pb-24 relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-5xl font-semibold py-8 text-center animate-fade-in-up">
          How to get started?
        </h1>

        <div className="flex justify-around gap-14 items-center pt-12 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center w-[300px] group hover:transform hover:-translate-y-2 transition-all duration-500 ease-out animate-fade-in-up delay-200">
            <div className="relative">
              <svg
                className="w-20 h-20 border-2 border-white rounded-full p-5 transition-all duration-300 group-hover:border-opacity-80 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20"
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold py-4 group-hover:text-green-200 transition-colors duration-300">
              Explore and Discover
            </h3>
            <p className="text-base tracking-tight leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              Browse diverse recipes from around the world. Discover new cooking
              ideas, flavors, and techniques.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center w-[300px] group hover:transform hover:-translate-y-2 transition-all duration-500 ease-out animate-fade-in-up delay-400">
            <div className="relative">
              <svg
                className="w-20 h-20 border-2 border-white rounded-full p-5 transition-all duration-300 group-hover:border-opacity-80 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20"
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold py-4 group-hover:text-green-200 transition-colors duration-300">
              Create your account
            </h3>
            <p className="text-base tracking-tight leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              Join our vibrant community for free. Access thousands of recipes
              and start sharing your creation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center w-[300px] group hover:transform hover:-translate-y-2 transition-all duration-500 ease-out animate-fade-in-up delay-600">
            <div className="relative">
              <svg
                className="w-20 h-20 border-2 border-white rounded-full p-5 transition-all duration-300 group-hover:border-opacity-80 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20"
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M253.33-160q-87.66 0-150.5-62.33Q40-284.67 40-372.33q0-78 48.67-138 48.66-60 126-73.67 21.66-95.33 96-155.33 74.33-60 170.66-60 114.34 0 192.5 81.5Q752-636.33 752-521.33v16q71 1.33 119.5 50.83T920-332.67q0 71-50.83 121.84Q818.33-160 747.33-160h-234q-27 0-46.83-19.83-19.83-19.84-19.83-46.84v-240.66l-76.67 76-47.33-47.34L480-596l157.33 157.33L590-391.33l-76.67-76v240.66h234q44 0 75-31t31-75q0-44-31-75t-75-31h-62v-82.66q0-87-59.83-149.17-59.83-62.17-146.83-62.17-87 0-147.17 62.17-60.17 62.17-60.17 149.17H252q-60.67 0-103 42.66Q106.67-436 106.67-374q0 60.67 42.95 104t103.71 43.33H380V-160H253.33ZM480-446.67Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold py-4 group-hover:text-green-200 transition-colors duration-300">
              Share your recipes
            </h3>
            <p className="text-base tracking-tight leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              Share your favourite recipes with the community. Connect with
              fellow food lovers and be part of our growing platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
