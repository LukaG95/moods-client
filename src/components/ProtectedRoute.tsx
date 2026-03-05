import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import GeneralLoader from "@/components/GeneralLoader";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <GeneralLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
