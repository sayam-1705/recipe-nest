const Signup = () => {
  return (
    <div
      className="flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-screen px-4 relative"
      style={{ backgroundImage: "url(/images/form-background.png)" }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

      <form className="flex flex-col items-center border border-white/30 rounded-xl p-10 backdrop-blur-lg bg-white/10 shadow-2xl animate-signup-fade-in max-w-md w-full transform transition-all duration-300 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-6 text-center animate-signup-slide-down">
          Sign Up
        </h1>
        <div className="flex flex-col space-y-4 w-full">
          <input
            className="bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 rounded-lg text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <input
            className="bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 rounded-lg text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <input
            className="bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 rounded-lg text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <input
            className="bg-white/20 backdrop-blur-md px-4 py-3 border border-white/30 rounded-lg text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
          <button
            type="submit"
            className="bg-gradient-to-r bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:scale-105 active:scale-95 outline-none focus:ring-0 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent mt-2"
          >
            Sign Up
          </button>
        </div>
        <p className="text-white/80 mt-6 text-center flex gap-1">
          Already have an account?
          <a
            href="/login"
            className="text-orange-300 font-medium hover:text-orange-200 transition-colors duration-300 no-underline hover:underline"
          >
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
