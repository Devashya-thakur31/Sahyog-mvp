import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
              Transparency-focused donation platform
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
              Connecting Hearts,
              <span className="text-primary-600"> Building Hope</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              SAHYOG is a platform connecting donors, volunteers, orphanages, old-age homes, and NGOs
              across Madhya Pradesh through verified impact tracking and community engagement.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup" className="btn-primary w-full sm:w-auto">
                Join SAHYOG
              </Link>
              <Link to="/login" className="btn-secondary w-full sm:w-auto">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-4 text-lg text-neutral-600">
              We started with a simple question: How can people help organizations in need while
              knowing where their contribution is going and what impact it creates?
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 .5.04 1 .12 1.5a8.987 8.987 0 005.618 7.5" />
                ),
                title: "Transparency",
                description: "Track every donation and see the real impact it creates through verified updates from organizations.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-2-2.83M9 20H4v-2a3 3 0 015-2.83M9 20v-2a3 3 0 016 0v2M9 20v-2a3 3 0 00-6 0v2m12-10a3 3 0 11-6 0 3 3 0 016 0z" />
                ),
                title: "Community",
                description: "Connect donors, volunteers, and organizations on a single platform built for meaningful collaboration.",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 11-6.835 0M3.42 4.697a3.42 3.42 0 016.835 0M14.835 4.697a3.42 3.42 0 11-6.835 0M11.42 4.697a3.42 3.42 0 016.835 0" />
                ),
                title: "Verified Impact",
                description: "Every organization is verified by our team to ensure trust and accountability across the platform.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-neutral-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Three simple steps to start making a difference.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Create an Account", description: "Sign up as a donor, volunteer, or organization in just a few minutes." },
              { step: "02", title: "Discover & Connect", description: "Browse verified organizations, explore needs, and find volunteering opportunities." },
              { step: "03", title: "Track Your Impact", description: "See real-time updates on how your contributions are making a difference." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl bg-white p-8 shadow-sm border border-neutral-200">
                <span className="text-4xl font-bold text-primary-200">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="who-we-serve" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Who We Serve</h2>
            <p className="mt-4 text-lg text-neutral-600">
              A platform designed for everyone who wants to make a positive impact.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Donors", description: "Discover and support verified organizations with full transparency." },
              { title: "Volunteers", description: "Find opportunities, apply directly, and track your participation." },
              { title: "Organizations", description: "Manage needs, receive support, and share impact updates." },
              { title: "Administrators", description: "Verify organizations and maintain trust across the platform." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-accent-300 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-lg text-primary-100">
            Join SAHYOG today and become part of a community dedicated to transparent, meaningful impact.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-primary-600 shadow-sm transition-all hover:bg-primary-50 hover:shadow-md"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
