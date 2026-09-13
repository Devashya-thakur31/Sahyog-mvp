import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type NeedCategory = "Food" | "Education" | "Medical" | "Clothing" | "Shelter" | "Equipment";
type NeedUrgency = "Critical" | "High" | "Moderate";
type NeedStatus = "Open" | "Fulfilled";

interface Need {
  id: string;
  title: string;
  organization: string;
  city: string;
  category: NeedCategory;
  urgency: NeedUrgency;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  status: NeedStatus;
}

const MOCK_NEEDS: Need[] = [
  {
    id: "1",
    title: "Monthly Food Supplies for 40 Children",
    organization: "Ashray Children's Home",
    city: "Bhopal",
    category: "Food",
    urgency: "Critical",
    description: "Rations including rice, dal, wheat, and cooking oil to feed 40 children for one month.",
    targetAmount: 25000,
    raisedAmount: 18500,
    status: "Open",
  },
  {
    id: "2",
    title: "School Books and Uniforms",
    organization: "Shiksha Niketan School",
    city: "Ujjain",
    category: "Education",
    urgency: "High",
    description: "Textbooks, notebooks, and uniforms for 60 tribal children for the new academic year.",
    targetAmount: 40000,
    raisedAmount: 12000,
    status: "Open",
  },
  {
    id: "3",
    title: "Medical Camp for Elderly Residents",
    organization: "Vridha Seva Sansthan",
    city: "Indore",
    category: "Medical",
    urgency: "High",
    description: "Funding for a quarterly medical check-up camp covering 35 elderly residents.",
    targetAmount: 15000,
    raisedAmount: 15000,
    status: "Fulfilled",
  },
  {
    id: "4",
    title: "Winter Clothing for Children",
    organization: "Ashray Children's Home",
    city: "Bhopal",
    category: "Clothing",
    urgency: "Moderate",
    description: "Warm sweaters, blankets, and socks for 40 children ahead of winter season.",
    targetAmount: 18000,
    raisedAmount: 7200,
    status: "Open",
  },
  {
    id: "5",
    title: "Roof Repair for Shelter Wing",
    organization: "Ujjwal Shelter Home",
    city: "Gwalior",
    category: "Shelter",
    urgency: "Critical",
    description: "Urgent roof repairs needed before monsoon to protect 25 residents from water damage.",
    targetAmount: 50000,
    raisedAmount: 8200,
    status: "Open",
  },
  {
    id: "6",
    title: "Computers for Digital Literacy Program",
    organization: "Pragati Foundation",
    city: "Jabalpur",
    category: "Equipment",
    urgency: "Moderate",
    description: "5 desktop computers to launch a digital literacy program for rural youth.",
    targetAmount: 60000,
    raisedAmount: 45000,
    status: "Open",
  },
];

const CATEGORIES: NeedCategory[] = ["Food", "Education", "Medical", "Clothing", "Shelter", "Equipment"];
const URGENCIES: NeedUrgency[] = ["Critical", "High", "Moderate"];

function urgencyColor(urgency: NeedUrgency): string {
  switch (urgency) {
    case "Critical": return "bg-red-50 text-red-700 border-red-200";
    case "High": return "bg-amber-50 text-amber-700 border-amber-200";
    case "Moderate": return "bg-primary-50 text-primary-700 border-primary-200";
  }
}

export default function NeedsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<NeedCategory | "All">("All");
  const [urgencyFilter, setUrgencyFilter] = useState<NeedUrgency | "All">("All");
  const [openOnly, setOpenOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_NEEDS.filter((need) => {
      const matchesSearch =
        need.title.toLowerCase().includes(search.toLowerCase()) ||
        need.organization.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || need.category === categoryFilter;
      const matchesUrgency = urgencyFilter === "All" || need.urgency === urgencyFilter;
      const matchesOpen = !openOnly || need.status === "Open";
      return matchesSearch && matchesCategory && matchesUrgency && matchesOpen;
    });
  }, [search, categoryFilter, urgencyFilter, openOnly]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Needs</h1>
          <p className="mt-2 text-neutral-600">
            Browse active needs from verified organizations and support a cause that matters to you.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search needs by title or organization..."
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as NeedCategory | "All")}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value as NeedUrgency | "All")}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="All">All Urgency</option>
                {URGENCIES.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <input
                  type="checkbox"
                  checked={openOnly}
                  onChange={(e) => setOpenOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                Open needs only
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-semibold text-neutral-700">{filtered.length}</span> of{" "}
            <span className="font-semibold text-neutral-700">{MOCK_NEEDS.length}</span> needs
          </p>
        </div>

        {/* Needs Cards Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white py-20 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-neutral-700">No needs found</h3>
            <p className="mt-1 text-sm text-neutral-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((need) => {
              const progress = Math.round((need.raisedAmount / need.targetAmount) * 100);
              return (
                <div
                  key={need.id}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                      {need.category}
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${urgencyColor(need.urgency)}`}>
                      {need.urgency}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">{need.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {need.organization} &middot; {need.city}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{need.description}</p>

                  {/* Progress Bar */}
                  <div className="mt-5">
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-semibold text-neutral-700">
                        &#8377;{need.raisedAmount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-neutral-500">
                        of &#8377;{need.targetAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className={`h-full rounded-full transition-all ${need.status === "Fulfilled" ? "bg-accent-500" : "bg-primary-500"}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-500">{progress}% funded</span>
                      {need.status === "Fulfilled" && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600">
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Fulfilled
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-neutral-100 pt-4">
                    <button
                      disabled={need.status === "Fulfilled"}
                      className="btn-primary w-full disabled:cursor-not-allowed"
                    >
                      {need.status === "Fulfilled" ? "Need Fulfilled" : "Support This Need"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <Link to="/" className="text-sm font-medium text-neutral-500 hover:text-primary-600">
            &larr; Back to home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
