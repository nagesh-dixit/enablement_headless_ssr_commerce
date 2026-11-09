"use client";

import { FormEvent, useState } from "react";

// Demo-only signup form: nothing is sent anywhere.
export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-blue-950 px-6 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Join the crew</h2>
        <p className="mt-3 text-blue-100">Trip ideas, gear guides, and early access to seasonal deals.</p>
        {submitted ? (
          <p className="mt-6 font-semibold">Thanks for signing up!</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 rounded-full px-5 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-3 font-semibold text-blue-950 hover:bg-blue-100"
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
