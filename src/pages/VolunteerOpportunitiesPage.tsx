import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type OpportunityCategory = "Teaching" | "Healthcare" | "Event Support" | "Mentorship" | "Fundraising" | "Field Work";
type CommitmentLevel = "One-time" | "Weekend" | "Ongoing";
type OpportunityStatus = "Open" | "Filled" | "Closed";

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  city: string;
  category: OpportunityCategory;
  commitment: CommitmentLevel;
  description: string;
  startDate: string;
  volunteersNeeded: number;
  volunteersApplied: number;
  status: OpportunityStatus;
  skillsRequired: string[];
}

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    title: "Weekend English Teaching for Children",
    organization: "Ashray Children's Home",
    city: "Bhopal",
    category: "Teaching",
    commitment: "Weekend",
    description: "Teach basic English to 40 children every Saturday morning. Lesson plans and materials provided.",
    startDate: "2026-09-20",
    volunteersNeeded: 4,
    volunteersApplied: 2,
    status: "Open",
    skillsRequired: ["English", "Patience with children"],
  },
  {
    id: "2",
    title: "Medical Check-up Camp Volunteers",
    organization: "Vridha Seva Sansthan",
    city: "Indore",
    category: "Healthcare",
    commitment: "One-time",
    description: "Assist doctors and nurses during a quarterly medical camp for 35 elderly residents.",
    startDate: "2026-09-25",
    volunteersNeeded: 6,
    volunteersApplied: 6,
    status: "Filled",
    skillsRequired: ["First Aid", "Organization"],
  },
  {
    id: "3",
    title: "Annual Charity Event Coordination",
    organization: "Pragati Foundation",
    city: "Jabalpur",
    category: "Event Support",
    commitment: "One-time",
    description: "Help coordinate logistics, registration, and guest management for our annual fundraising gala.",
    startDate: "2026-10-05",
    volunteersNeeded: 10,
    volunteersApplied: 4,
    status: "Open",
    skillsRequired: ["Event management", "Communication"],
  },
  {
    id: "4",
    title: "Ongoing Mentorship for Youth",
    organization: "Shiksha Niketan School",
    city: "Ujjain",
    category: "Mentorship",
    commitment: "Ongoing",
    description: "Mentor tribal youth aged 14-18 on career guidance and life skills. Minimum 3-month commitment.",
    startDate: "2026-10-01",
    volunteersNeeded: 8,
    volunteersApplied: 3,
    status: "Open",
    skillsRequired: ["Mentoring", "Career guidance"],
  },
  {
    id: "5",
    title: "Winter Clothing Distribution Drive",
    organization: "Ashray Children's Home",
    city: "Bhopal",
    category: "Fundraising",
    commitment: "Weekend",
    description: "Organize and execute a clothing collection and distribution drive across 3 city locations.",
    startDate: "2026-10-15",
    volunteersNeeded: 12,
    volunteersApplied: 5,
    status: "Open",
    skillsRequired: ["Logistics", "Teamwork"],
  },
  {
    id: "6",
    title: "Rural Education Field Survey",
    organization: "Pragati Foundation",
    city: "Jabalpur",
    category: "Field Work",
    commitment: "One-time",
    description: "Conduct a field survey across 5 rural villages to assess education needs and enrollment gaps.",
    startDate: "2026-09-28",
    volunteersNeeded: 5,
    volunteersApplied: 5,
    status: "Closed",
    skillsRequired: ["Data collection", "Hindi proficiency"],
  },
];

const CATEGORIES: OpportunityCategory[] = ["Teaching", "Healthcare", "Event Support", "Mentorship", "Fundraising", "Field Work"];
const COMMITMENTS: CommitmentLevel[] = ["One-time", "Weekend", "Ongoing"];

function commitmentColor(commitment: CommitmentLevel): string {
  switch (commitment) {
    case "One-time": return "bg-primary-50 text-primary-700";
    case "Weekend": return "bg-accent-50 text-accent-700";
    case "Ongoing": return "bg-neutral-100 text-neutral-600";
  }
}

function statusColor(status: OpportunityStatus): string {
  switch (status) {
    case "Open": return "text-accent-600";
    case "Filled": return "text-amber-600";
    case "Closed": return "text-neutral-400";
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function VolunteerOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<OpportunityCategory | "All">("All");
  const [commitmentFilter, setCommitmentFilter] = useState<CommitmentLevel | "All">("All");
  const [openOnly, setOpenOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter((opp) => {
      const matchesSearch =
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.organization.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || opp.category === categoryFilter;
      const matchesCommitment = commitmentFilter === "All" || opp.commitment === commitmentFilter;
      const matchesOpen = !openOnly || opp.status === "Open";
      return matchesSearch && matchesCategory && matchesCommitment && matchesOpen;
    });
  }, [search, categoryFilter, commitmentFilter, openOnly]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Volunteer Opportunities</h1>
          <p className="mt-2 text-neutral-600">
            Find meaningful ways to contribute your time and skills to organizations in need.
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
                placeholder="Search opportunities by title or organization..."
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as OpportunityCategory | "All")}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={commitmentFilter}
                onChange={(e) => setCommitmentFilter(e.target.value as CommitmentLevel | "All")}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="All">All Commitments</option>
                {COMMITMENTS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <input
                  type="checkbox"
                  checked={openOnly}
                  onChange={(e) => setOpenOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                Open only
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-semibold text-neutral-700">{filtered.length}</span> of{" "}
            <span className="font-semibold text-neutral-700">{MOCK_OPPORTUNITIES.length}</span> opportunities
          </p>
        </div>

        {/* Opportunities Cards Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white py-20 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-neutral-700">No opportunities found</h3>
            <p className="mt-1 text-sm text-neutral-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opp) => {
              const slotsLeft = opp.volunteersNeeded - opp.volunteersApplied;
              return (
                <div
                  key={opp.id}
                  className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                      {opp.category}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${commitmentColor(opp.commitment)}`}>
                      {opp.commitment}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">{opp.title}</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {opp.organization} &middot; {opp.city}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{opp.description}</p>

                  {/* Skills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {opp.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Date & Slots */}
                  <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 text-sm">
                    <div className="flex items-center gap-1.5 text-neutral-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(opp.startDate)}
                    </div>
                    <span className={`font-semibold ${statusColor(opp.status)}`}>
                      {opp.status === "Open"
                        ? `${slotsLeft} slot${slotsLeft !== 1 ? "s" : ""} left`
                        : opp.status === "Filled"
                        ? "All slots filled"
                        : "Closed"}
                    </span>
                  </div>

                  {/* Apply Button */}
                  <div className="mt-4">
                    <button
                      disabled={opp.status !== "Open"}
                      className="btn-primary w-full disabled:cursor-not-allowed"
                    >
                      {opp.status === "Open" ? "Apply Now" : opp.status === "Filled" ? "Slots Filled" : "Closed"}
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
