import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Form from "@/components/auth/Form";
import Input from "@/components/auth/Input";
import Button from "@/components/ui/Button";
import { useFetch } from "@/hooks/useFetch";
import styles from "./Login.module.scss";
import Logo from "@/assets/images/logo.svg";
import { error_codes } from "@/lib/errors";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refetchAuth } = useAuth();

  const {
    loading,
    refetch: login,
    error,
  } = useFetch<{ token: string }>(
    {
      url: "/api/auth/login",
      method: "POST",
    },
    {
      auto: false,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await login({
      url: "/api/auth/login",
      method: "POST",
      data: { email, password },
    });
    if (ok) refetchAuth();
  }

  return (
    <div className={styles.page}>
      <img src={Logo} alt="Logo" />
      <Form
        title="Welcome back!"
        description="Log in to continue tracking your mood and sleep"
        submit={handleSubmit}
      >
        <div className={styles.inputsWrapper}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ? error_codes.email[error.error_id] : null}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error ? error_codes.password[error.error_id] : null}
          />
        </div>
        <div className={styles.bottomWrapper}>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <p>
            Haven't got an account?
            <Link to="/signup">
              <span className={styles.signupLink}> Sign up.</span>
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
