import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Mission", href: "#mission" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Who We Serve", href: "#who-we-serve" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-lg">
            S
          </span>
          <span className="text-xl font-bold text-neutral-900">SAHYOG</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-neutral-700 transition-colors hover:text-primary-600"
          >
            Log In
          </Link>
          <Link to="/signup" className="btn-primary">
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center rounded-md p-2 text-neutral-600 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-neutral-600 hover:text-primary-600"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                className={`text-sm font-semibold ${location.pathname === "/login" ? "text-primary-600" : "text-neutral-700"}`}
              >
                Log In
              </Link>
              <Link to="/signup" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
