import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import NeedsPage from "./pages/NeedsPage";
import VolunteerOpportunitiesPage from "./pages/VolunteerOpportunitiesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/organizations" element={<OrganizationsPage />} />
        <Route path="/needs" element={<NeedsPage />} />
        <Route path="/volunteer" element={<VolunteerOpportunitiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
