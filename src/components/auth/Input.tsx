import React from "react";
import styles from './Input.module.scss';
import InfoCircle from '@/assets/images/info-circle.svg';

type InputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
};

const Input: React.FC<InputProps> = ({ type, value, onChange, error }) => {
  const id = type.toLowerCase();

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={type === "email" ? "name@mail.com" : ""}
        className={error ? styles.inputError : ''}
      />
      { error && <p className={styles.error}><img src={InfoCircle} alt="Info" />{error}</p> }
    </div>
  );
};

export default Input;
