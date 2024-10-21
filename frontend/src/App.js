import React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// import HomePage from "./views/HomePage";
// import Dashboard from "./views/Dashboard";
import LoginPage from "./views/LoginPage";
import Contact from "./pages/Contact";
import RegisterPage from "./views/RegisterPage";
import NotFound from "./views/NotFound";
import TestLogin from "./views/TestLogin";
import Spinner from "./pages/Spinner";
import OverviewRoute from "./OverviewRoute";


// new dashboard overview
import OverviewPage from "./newPage/OverviewPage";
// import ProductsPage from "./newPage/ProductsPage";
// import UsersPage from "./newPage/UsersPage";
// import SalesPage from "./newPage/SalesPage";
// import OrdersPage from "./newPage/OrdersPage";
// import AnalyticsPage from "./newPage/AnalyticsPage";
// import SettingsPage from "./newPage/SettingsPage";

// import CustomerRegistration from "./pages/CustomerRegistration";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <Router>
      {/* <OverviewRoute/> */}
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test" element={<TestLogin />} />
            {/* <Route path='/about' element={<About/>}/> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* new Route */}

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <OverviewRoute />
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
