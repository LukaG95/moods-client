import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { api } from "./lib/api";
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, loading, refetchAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  // auth redirect logic
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  if (!user && !isAuthPage) return <Navigate to="/login" replace />;
  if (user && isAuthPage) return <Navigate to="/" replace />;

  function logout() {
    api
      .request({
        url: "/api/auth/logout",
        method: "POST",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => refetchAuth());
  }

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/signup")}>Signup</button>
        <button onClick={logout}>LOGOUT (API)</button>
      </nav>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
