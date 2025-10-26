"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { setAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Signup failed");
      }

      return response.json();
    },
    onSuccess: async () => {
      // After signup, login
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        setAuth(loginData.token, loginData.user);
        router.push("/");
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setValidationError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    setValidationError("");

    try {
      await signupMutation.mutateAsync({
        name,
        email,
        password,
        confirmPassword,
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const displayError =
    validationError ||
    (signupMutation.isError
      ? signupMutation.error instanceof Error
        ? signupMutation.error.message
        : "Signup failed. Please try again."
      : "");

  return (
    <ProtectedRoute requireAuth={false}>
      <div
        className="flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-screen px-4 sm:px-6 lg:px-8 relative"
        style={{ backgroundImage: "url(/images/form-background.png)" }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>

        <form
          className="flex flex-col items-center border border-white/30 rounded-xl p-6 sm:p-8 md:p-10 backdrop-blur-lg bg-white/10 shadow-2xl animate-signup-fade-in w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transform transition-all duration-300 relative z-10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 text-center animate-signup-slide-down">
            Sign Up
          </h1>
          <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
            <input
              className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 border border-white/30 rounded-lg text-sm sm:text-base text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 border border-white/30 rounded-lg text-sm sm:text-base text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <div className="relative">
              <input
                className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-white/30 rounded-lg text-sm sm:text-base text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50 w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 p-1"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 -960 960 960"
                    width="18px"
                    fill="currentColor"
                    className="sm:h-5 sm:w-5"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 -960 960 960"
                    width="18px"
                    fill="currentColor"
                    className="sm:h-5 sm:w-5"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="relative">
              <input
                className="bg-white/20 backdrop-blur-md px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-white/30 rounded-lg text-sm sm:text-base text-white placeholder-white/70 transition-all duration-300 focus:border-white/60 focus:bg-white/25 outline-none focus:ring-0 focus:ring-white/20 hover:border-white/50 w-full"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 p-1"
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 -960 960 960"
                    width="18px"
                    fill="currentColor"
                    className="sm:h-5 sm:w-5"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 -960 960 960"
                    width="18px"
                    fill="currentColor"
                    className="sm:h-5 sm:w-5"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>
            {displayError && (
              <p className="text-red-500 text-xs sm:text-sm mt-2 text-center px-2">
                {displayError}
              </p>
            )}
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="bg-gradient-to-r bg-orange-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:scale-105 active:scale-95 outline-none focus:ring-0 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {signupMutation.isPending ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
          <p className="text-white/80 mt-4 sm:mt-6 text-center text-sm sm:text-base">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-orange-300 font-medium hover:text-orange-200 transition-colors duration-300 no-underline hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default Signup;
