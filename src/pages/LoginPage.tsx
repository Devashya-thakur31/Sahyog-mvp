import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Supabase auth integration will go here
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log("Login attempt:", { email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xl">
              S
            </span>
            <span className="text-2xl font-bold text-neutral-900">SAHYOG</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Log in to your SAHYOG account to continue making an impact.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <button type="button" className="text-xs font-medium text-primary-600 hover:text-primary-700">
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          <Link to="/" className="hover:text-neutral-600">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
