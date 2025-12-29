import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Form from "@/ui/auth/Form";
import Input from "@/ui/auth/Input";
import Button from "@/ui/general/Button";
import { useFetch } from "@/hooks/useFetch";
import styles from "./Login.module.scss";
import { error_codes } from "@/lib/errors";
import { Link } from "react-router-dom";
import { useAnimate } from "@/context/TransitionContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { transitioning } = useAnimate();

  const { refetchAuth } = useAuth();

  const {
    loading,
    refetch: login,
    error,
  } = useFetch<{ token: string }>(undefined, {
    auto: false,
  });

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
      <Form
        title="Welcome back!"
        description="Log in to continue tracking your mood and sleep"
        submit={handleSubmit}
        className={`${styles.form} ${
          transitioning ? styles.fadeOut : styles.fadeIn
        }`}
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
