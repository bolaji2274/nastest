import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./views/HomePage";
// import Dashboard from "./views/Dashboard";
import LoginPage from "./views/LoginPage";
import Contact from "./pages/Contact";
import RegisterPage from "./views/RegisterPage";
import NotFound from "./views/NotFound";
import TestLogin from "./views/TestLogin";
import Spinner from "./pages/Spinner";
// import Dashboard from './Dashboard'
// import AnalyticsDashboard from "./Dashboard/AnalyticsDashboard/AnalyticsDashboard";
// import AdminDashboard from "./Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashboard from "./Dashboard/CustomerDashboard/CustomerDashboard";
// import CustomerDashboard from "./Dashboard/CustomerDashboard/CustomerDashboard";

import CustomerRegistration from "./pages/CustomerRegistration";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerRegistration />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test" element={<TestLogin />} />
            {/* <Route path='/about' element={<About/>}/> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <CustomerDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
