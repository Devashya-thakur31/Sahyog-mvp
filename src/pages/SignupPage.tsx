import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

type Role = "donor" | "volunteer" | "organization";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("donor");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles: { value: Role; label: string; description: string }[] = [
    { value: "donor", label: "Donor", description: "Support verified organizations" },
    { value: "volunteer", label: "Volunteer", description: "Find opportunities to help" },
    { value: "organization", label: "Organization", description: "Receive support & share impact" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      // Supabase auth integration will go here
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: { data: { full_name: fullName, role } }
      // });
      console.log("Signup attempt:", { fullName, email, password, role });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during signup");
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
          <h1 className="text-2xl font-bold text-neutral-900">Create an Account</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Join SAHYOG and start making a transparent, measurable impact.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="form-label">I want to join as</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`rounded-lg border p-3 text-center transition-all ${
                      role === r.value
                        ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20"
                        : "border-neutral-300 bg-white hover:border-neutral-400"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-neutral-900">{r.label}</span>
                    <span className="mt-0.5 block text-[11px] text-neutral-500">{r.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="input-field"
              />
            </div>

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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder="Re-enter your password"
                className="input-field"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Log in
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
