import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type OrgType = "Orphanage" | "Old-Age Home" | "NGO" | "Shelter" | "School";
type VerificationStatus = "Verified" | "Pending";

interface Organization {
  id: string;
  name: string;
  type: OrgType;
  city: string;
  description: string;
  verified: VerificationStatus;
  established: string;
  supporters: number;
}

const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "1",
    name: "Ashray Children's Home",
    type: "Orphanage",
    city: "Bhopal",
    description: "Providing shelter, education, and care for orphaned children across Madhya Pradesh since 2005.",
    verified: "Verified",
    established: "2005",
    supporters: 342,
  },
  {
    id: "2",
    name: "Vridha Seva Sansthan",
    type: "Old-Age Home",
    city: "Indore",
    description: "A safe haven for elderly individuals offering medical care, companionship, and dignified living.",
    verified: "Verified",
    established: "2010",
    supporters: 198,
  },
  {
    id: "3",
    name: "Pragati Foundation",
    type: "NGO",
    city: "Jabalpur",
    description: "Empowering rural communities through education, healthcare, and sustainable livelihood programs.",
    verified: "Verified",
    established: "2008",
    supporters: 521,
  },
  {
    id: "4",
    name: "Ujjwal Shelter Home",
    type: "Shelter",
    city: "Gwalior",
    description: "Emergency shelter and rehabilitation for women and children in crisis situations.",
    verified: "Pending",
    established: "2018",
    supporters: 87,
  },
  {
    id: "5",
    name: "Shiksha Niketan School",
    type: "School",
    city: "Ujjain",
    description: "Free education for underprivileged children from tribal and rural backgrounds.",
    verified: "Verified",
    established: "2012",
    supporters: 276,
  },
  {
    id: "6",
    name: "Anath Balakashram Trust",
    type: "Orphanage",
    city: "Rewa",
    description: "Caring for abandoned children with a focus on education, nutrition, and emotional well-being.",
    verified: "Pending",
    established: "2015",
    supporters: 134,
  },
];

const ORG_TYPES: OrgType[] = ["Orphanage", "Old-Age Home", "NGO", "Shelter", "School"];
const CITIES = ["All Cities", "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Rewa"];

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<OrgType | "All">("All");
  const [cityFilter, setCityFilter] = useState<string>("All Cities");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_ORGANIZATIONS.filter((org) => {
      const matchesSearch =
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || org.type === typeFilter;
      const matchesCity = cityFilter === "All Cities" || org.city === cityFilter;
      const matchesVerified = !verifiedOnly || org.verified === "Verified";
      return matchesSearch && matchesType && matchesCity && matchesVerified;
    });
  }, [search, typeFilter, cityFilter, verifiedOnly]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Organizations</h1>
          <p className="mt-2 text-neutral-600">
            Discover verified organizations across Madhya Pradesh working to make a difference.
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
                placeholder="Search organizations by name or keyword..."
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as OrgType | "All")}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="All">All Types</option>
                {ORG_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                Verified only
              </label>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-semibold text-neutral-700">{filtered.length}</span> of{" "}
            <span className="font-semibold text-neutral-700">{MOCK_ORGANIZATIONS.length}</span> organizations
          </p>
        </div>

        {/* Organization Cards Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white py-20 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-neutral-700">No organizations found</h3>
            <p className="mt-1 text-sm text-neutral-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((org) => (
              <div
                key={org.id}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                    {org.type}
                  </span>
                  {org.verified === "Verified" ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-600">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pending
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-neutral-900">{org.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {org.city} &middot; Est. {org.established}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{org.description}</p>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <span className="text-sm text-neutral-500">
                    <span className="font-semibold text-neutral-700">{org.supporters}</span> supporters
                  </span>
                  <button className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700">
                    View Profile &rarr;
                  </button>
                </div>
              </div>
            ))}
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
