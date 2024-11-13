// App.js
import { Routes, Route } from "react-router-dom";
import Auth0ProviderWithNavigate from "./auth0providerwithnavigate"; // Adjust the path as necessary
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ResumePage from "./pages/ResumePage";
import LandingPage from "./pages/LandingPage"; // Import the LandingPage
import JobSearch from "./pages/JobSearch";
import TopNav from "./components/TopNav";

function App() {
  return (
    <div className="app">
      <nav>
        <TopNav />
      </nav>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LandingPage />} />{" "}
          {/* Set LandingPage as the default route */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/jobsearch" element={<JobSearch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
