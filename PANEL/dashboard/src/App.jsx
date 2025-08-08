import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./pages/Login";
import Plans from "./pages/Plans";
import BotSetup from "./pages/BotSetup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Settings from "./pages/Settings";
import Error from "./pages/Error";
import { getUserSession, hasRole, isAdmin } from "./utils/auth";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getUserSession().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white text-2xl">Loading...</div>;

  return (
    <Router>
      <Navbar active={0} onNavigate={() => {}} />
      <Notification message="" type="success" show={false} onClose={() => {}} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/setup" element={user && hasRole(user, "Premium+") ? <BotSetup /> : <Error code={403} message="Access Denied" />} />
          <Route path="/dashboard" element={user && hasRole(user, "Premium+") ? <UserDashboard /> : <Error code={403} message="Access Denied" />} />
          <Route path="/admin" element={user && isAdmin(user) ? <AdminDashboard /> : <Error code={403} message="Admin Only" />} />
          <Route path="/settings" element={user ? <Settings /> : <Error code={403} message="Login Required" />} />
          <Route path="*" element={<Error code={404} message="Page Not Found" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
