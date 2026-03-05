import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTransitioning } from "./context/TransitionContext";
import { api } from "./lib/api";
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DelayMounting from "./DelayMounting";
import AnimatedLogo from "./AnimatedLogo";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { refetchAuth } = useAuth();
  const { setTransitioning } = useTransitioning();
  const location = useLocation();
  const navigate = useNavigate();

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
        <button onClick={logout}>LOGOUT (API)</button>
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
