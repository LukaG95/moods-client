import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useTransitioning } from "./context/TransitionContext";
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DelayMounting from "./DelayMounting";
import AnimatedLogo from "./AnimatedLogo";
import ProtectedRoute from "./components/ProtectedRoute";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { refetchAuth } = useAuthContext();
  const { setTransitioning } = useTransitioning();
  const location = useLocation();
  const navigate = useNavigate();

  const { refetch: logout } = useFetch<{ token: string }>(undefined, {
    auto: false,
  });

  async function handleLogout() {
    logout({
      url: "/api/auth/logout",
      method: "POST",
    })
      .then((res) => {
        console.log("loggedout", res);
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
        <button
          onClick={() => {
            setTransitioning(true);
            navigate("/login");
          }}
        >
          Login
        </button>

        <button
          onClick={() => {
            setTransitioning(true);
            navigate("/signup");
          }}
        >
          Signup
        </button>
        <button onClick={handleLogout}>LOGOUT (API)</button>
      </nav>

      <main className={styles.main}>
        {["/login", "/signup"].includes(location.pathname) && <AnimatedLogo />}
        <Routes>
          <Route element={<DelayMounting />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
