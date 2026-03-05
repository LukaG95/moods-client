import { useState } from "react";
import Form from "@/ui/auth/Form";
import Input from "@/ui/auth/Input";
import Button from "@/ui/general/Button";
import styles from "./Signup.module.scss";
import TransitionLink from "@/components/TransitionLink";
import { useTransitioning } from "@/context/TransitionContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { transitioning, setTransitioning } = useTransitioning();

  return (
    <div className={styles.page}>
      <Form
        title="Create an account"
        description="Join to track your daily modds and sleep with ease."
        onAnimationEnd={() => {
          if (transitioning) setTransitioning(false);
        }}
        className={`${styles.form} ${
          transitioning ? styles.fadeOut : styles.fadeIn
        }`}
        submit={() => console.log("submitted")}
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
            <TransitionLink to="/login">
              <span className={styles.signupLink}> Login.</span>
            </TransitionLink>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
