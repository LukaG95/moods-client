import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import GeneralLoader from "@/components/GeneralLoader";

export default function ProtectedRoute() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <GeneralLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
