import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
              S
            </span>
            <span className="text-lg font-bold text-neutral-900">SAHYOG</span>
          </div>
          <p className="text-sm text-neutral-500">
            Connecting donors, volunteers, and organizations across Madhya Pradesh.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-neutral-600 hover:text-primary-600">
              Log In
            </Link>
            <Link to="/signup" className="text-sm font-medium text-neutral-600 hover:text-primary-600">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 pt-6 text-center">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} SAHYOG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
