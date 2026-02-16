import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/components/LoginForm";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ProtectedRoute from "../routes/ProtectedRoutes.jsx";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
