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
import { showToast } from "./components/Toast";
import { routesConfig } from "./lib/routesConfig";

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
        showToast("Logged out", 2, "success");
        console.log("loggedout", res);
      })
      .catch((err) => {
        showToast("Error logging out", 2, "error");
        console.error(err);
      })
      .finally(() => refetchAuth());
  }

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <button onClick={() => navigate(routesConfig.home)}>Home</button>
        <button onClick={() => navigate(routesConfig.dashboard)}>
          Dashboard
        </button>
        <button
          onClick={() => {
            setTransitioning(true);
            navigate(routesConfig.login);
          }}
        >
          Login
        </button>

        <button
          onClick={() => {
            setTransitioning(true);
            navigate(routesConfig.signup);
          }}
        >
          Signup
        </button>
        <button onClick={handleLogout}>LOGOUT (API)</button>
      </nav>

      <main className={styles.main}>
        {[routesConfig.login, routesConfig.signup].includes(
          location.pathname,
        ) && <AnimatedLogo />}
        <Routes>
          <Route element={<DelayMounting />}>
            <Route path={routesConfig.login} element={<Login />} />
            <Route path={routesConfig.signup} element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={routesConfig.home} element={<Home />} />
            <Route path={routesConfig.dashboard} element={<Dashboard />} />
          </Route>

          <Route path={routesConfig.any} element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
