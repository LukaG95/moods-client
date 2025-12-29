import { useState } from "react";
import Form from "@/ui/auth/Form";
import Input from "@/ui/auth/Input";
import Button from "@/ui/general/Button";
import styles from "./Signup.module.scss";

import { Link } from "react-router-dom";
import { useAnimate } from "@/context/TransitionContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { transitioning } = useAnimate();

  return (
    <div className={styles.page}>
      <Form
        title="Create an account"
        description="Join to track your daily modds and sleep with ease."
        className={`${styles.form} ${
          transitioning ? styles.fadeOut : styles.fadeIn
        }`}
      >
        <div className={styles.inputsWrapper}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={null}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={null}
          />
        </div>
        <div className={styles.bottomWrapper}>
          <Button type="submit">Sign up</Button>
          <p>
            Already got an account?
            <Link to="/login">
              <span className={styles.signupLink}> Login.</span>
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
