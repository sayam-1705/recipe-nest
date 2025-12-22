"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { setAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ParticleBackground from "@/components/3d/ParticleBackground";

const FuturisticSignup = () => {
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    signupMutation.mutate({ name, email, password, confirmPassword });
  };

  return (
    <ProtectedRoute requireAuth={false}>
      <div className="relative flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden py-20">
        <ParticleBackground />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl animate-float-3d"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float-3d animate-delay-3"></div>
        </div>

        <form
          className="relative z-10 card-futuristic p-8 sm:p-10 md:p-12 w-full max-w-md animate-slide-in-3d transform-3d"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full glassmorphism border-2 border-neon-green/50 flex items-center justify-center animate-neon-pulse">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="url(#signupGradient)" />
                <defs>
                  <linearGradient id="signupGradient" x1="4" y1="4" x2="20" y2="20">
                    <stop offset="0%" stopColor="#39FF14" />
                    <stop offset="100%" stopColor="#B026FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neon-green via-neon-purple to-neon-pink bg-clip-text text-transparent animate-neon-pulse">
            Create Account
          </h1>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <input className="input-neon w-full" type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email Address</label>
              <input className="input-neon w-full" type="email" name="email" placeholder="your.email@example.com" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input className="input-neon w-full pr-12" type={showPassword ? "text" : "password"} name="password" placeholder="At least 6 characters" value={formData.password} onChange={handleInputChange} required />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d={showPassword ? "m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" : "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"} />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <input className="input-neon w-full pr-12" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleInputChange} required />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d={showConfirmPassword ? "m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" : "M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"} />
                  </svg>
                </button>
              </div>
            </div>

            {(validationError || signupMutation.isError) && (
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10">
                <p className="text-red-400 text-sm text-center">
                  {validationError || (signupMutation.error instanceof Error ? signupMutation.error.message : "Signup failed.")}
                </p>
              </div>
            )}

            <button type="submit" disabled={signupMutation.isPending} className="btn-futuristic w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {signupMutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-neon-green hover:text-neon-purple transition-colors duration-300 font-medium hover:underline">
                Log in
              </a>
            </p>
          </div>

          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-neon-green/30 rounded-tl-xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-neon-purple/30 rounded-br-xl"></div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default FuturisticSignup;
