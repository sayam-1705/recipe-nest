"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { setAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

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

  const googleSignupMutation = useMutation({
    mutationFn: async (credential: string) => {
      const response = await fetch("/api/google-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Google signup failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push("/");
    },
  });

  const handleGoogleSuccess = (credential: string) => {
    googleSignupMutation.mutate(credential);
  };

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

    setValidationError("");

    signupMutation.mutate({ name, email, password, confirmPassword });
  };

  const displayError =
    validationError ||
    (signupMutation.isError
      ? signupMutation.error instanceof Error
        ? signupMutation.error.message
        : "Signup failed. Please try again."
      : googleSignupMutation.isError
      ? googleSignupMutation.error instanceof Error
        ? googleSignupMutation.error.message
        : "Google signup failed. Please try again."
      : "");

  return (
    <ProtectedRoute requireAuth={false}>
      <div className="relative min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-500 overflow-hidden font-outfit">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary-stitch/10 rounded-full blur-[120px] dark:bg-primary-stitch/5 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[100px] dark:bg-orange-600/5 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg px-6 py-12">
          {/* Brand Logo/Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-stitch/10 border border-primary-stitch/20 text-primary-stitch text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-stitch opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-stitch"></span>
              </span>
              Start Cooking
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              Create Your <span className="text-gradient">Account</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto">
              Join our community of gourmet enthusiasts and share your culinary
              masterpieces
            </p>
          </div>

          {/* Form Container */}
          <div className="glass-panel rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-primary-stitch/5 border-white/40 dark:border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Your Name
                  </label>
                  <div className="relative flex items-center bg-white/50 dark:bg-slate-800/40 rounded-2xl px-4 py-3 border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-primary-stitch/30 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-xl mr-3">
                      person
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Chef G. Ramsay"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium text-slate-900 dark:text-white placeholder-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center bg-white/50 dark:bg-slate-800/40 rounded-2xl px-4 py-3 border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-primary-stitch/30 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-xl mr-3">
                      mail
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="chef@nest.com"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium text-slate-900 dark:text-white placeholder-slate-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <div className="relative flex items-center bg-white/50 dark:bg-slate-800/40 rounded-2xl px-4 py-3 border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-primary-stitch/30 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-xl mr-3">
                      lock
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Strong pass"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium text-slate-900 dark:text-white placeholder-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="ml-2 text-slate-400 hover:text-primary-stitch transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center bg-white/50 dark:bg-slate-800/40 rounded-2xl px-4 py-3 border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-primary-stitch/30 transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-xl mr-3">
                      verified_user
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Repeat pass"
                      className="w-full bg-transparent border-none p-0 focus:ring-0 text-base font-medium text-slate-900 dark:text-white placeholder-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="ml-2 text-slate-400 hover:text-primary-stitch transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {displayError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold animate-shake">
                  <span className="material-symbols-outlined text-lg">
                    error
                  </span>
                  {displayError}
                </div>
              )}

              <button
                type="submit"
                disabled={signupMutation.isPending}
                className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-primary-stitch text-white font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary-stitch/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-4"
              >
                {signupMutation.isPending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <span className="material-symbols-outlined text-xl">
                      how_to_reg
                    </span>
                  </>
                )}
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
                  <span className="bg-transparent px-4 text-slate-400 bg-white dark:bg-slate-900">
                    Or join with
                  </span>
                </div>
              </div>

              <div className="w-full">
                <GoogleSignInButton
                  onSuccess={handleGoogleSuccess}
                  onError={() => {}}
                  text="signup_with"
                />
              </div>
            </form>

            <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary-stitch font-bold hover:underline transition-all"
              >
                Sign in instead
              </a>
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Signup;
