import React from "react";
import type { FormEvent } from "react";
import styles from "./Form.module.scss";

type Props = {
  submit: (e: FormEvent) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  animate_card?: boolean;
  className?: string;
};

const Form = ({ submit, title, description, children, className }: Props) => {
  return (
    <form className={`${styles.form} ${className}`} onSubmit={submit}>
      <header>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      {children}
    </form>
  );
};

export default Form;
