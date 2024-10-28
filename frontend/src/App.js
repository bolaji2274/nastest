import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// import HomePage from "./views/HomePage";
// import Dashboard from "./views/Dashboard";
    // Auth Routh 

import LoginPage from "./components/Auth.Route/LoginPage";
import RegisterPage from "./components/Auth.Route/RegisterPage";

import Contact from "./pages/Contact";
import NotFound from "./views/NotFound";
import TestLogin from "./views/TestLogin";
import Spinner from "./pages/Spinner";
// import OverviewRoute from "./OverviewRoute";

// new dashboard overview
import Dashboard from "./components/AdminDashboard/AllDashboard/Dashboard";
import OverviewPage from "./components/AdminDashboard/AllDashboard/OverviewPage";
import ProductsPage from "./components/AdminDashboard/AllDashboard/ProductsPage";
import UsersPage from "./components/AdminDashboard/AllDashboard/UsersPage";
import SalesPage from "./components/AdminDashboard/AllDashboard/SalesPage";
import OrdersPage from "./components/AdminDashboard/AllDashboard/OrdersPage";
import AnalyticsPage from "./components/AdminDashboard/AllDashboard/AnalyticsPage";
import SettingsPage from "./components/AdminDashboard/AllDashboard/SettingsPage";


import CustomerDashboard from "./components/CustomerDashboard/customer/CustomerDashboard";
import Application from "./components/CustomerDashboard/customer/Application";
import ReviewOrders from "./components/CustomerDashboard/customer/Review";
import Overview from "./components/CustomerDashboard/customer/Overview";
import PendingOrders from "./components/CustomerDashboard/customer/PendingOrder";
import OrderForm from "./components/CustomerDashboard/customer/OrderForm";
import CustomerOrders from "./components/CustomerDashboard/customer/CustomerOrders";
import AdminOrders from "./components/CustomerDashboard/customer/AdminOrders";
// import CustomerRegistration from "./pages/CustomerRegistration";



const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myorder" element={<OrderForm />} />
            <Route path="/customorder" element={<CustomerOrders />} />
            <Route path="/adminorder" element={<AdminOrders />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test" element={<TestLogin />} />
            {/* <Route path='/about' element={<About/>}/> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* new login  */}
             {/* Test Route  */}
            

            {/* new Route */}
            <Route path='/admin/dashboard' element={<OverviewPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />

            {/* Customer Route  */}
            <Route path="/application" element={<Application/> }/>
            <Route path='/review' element={<ReviewOrders/>} />
            <Route path='/applications/pending' element={<PendingOrders/>}/>

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                  
                </PrivateRoute>
              }
            />
        <Route
              path="/customer/dashboard"
              element={
                <PrivateRoute>
                  <CustomerDashboard />
                  
                </PrivateRoute>
              }
            />


            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <OverviewRoute /> */}
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
