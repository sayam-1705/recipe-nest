"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="max-w-md text-center p-4 sm:p-6 md:p-8">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-slate-400 dark:text-slate-600 mb-4">404</h1>
          <div className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-600 mb-4 flex items-center justify-center">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-orange hover:bg-primary-orange-hover text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
