import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AuthForm.module.css";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function AuthForm({ onSubmit, isRegisterPage = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {isRegisterPage && (
          <div>
            <label htmlFor="username">Your username</label>

            <input
              id="username"
              type="username"
              {...register("username")}
              placeholder="Username"
            />
            <p className={styles.text_error}>{errors.username?.message}</p>
          </div>
        )}
        <div>
          <label htmlFor="email">Your email</label>

          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Email"
          />
          <p className={styles.text_error}>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Your password</label>

          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          <p className={styles.text_error}>{errors.password?.message}</p>
        </div>
        <div className={styles.text}>
          <Link to={isRegisterPage ? "/login" : "/register"}>
            {isRegisterPage ? "Account already exist?" : "No account ?"}
          </Link>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuthForm;
