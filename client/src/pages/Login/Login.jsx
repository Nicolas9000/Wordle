import { useMemo, useCallback, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthService from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import CookieService from "../../services/cookie";
import styles from "./Login.module.css";

function Login() {
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);
  const cookieService = useMemo(() => new CookieService(), []);

  const onLogin = useCallback(async (data) => {
    setDisabled(true);
    try {
      const loginData = await authService.login(data);
      setDisabled(false);
      cookieService.setCookie(loginData.token);
      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <AuthForm onSubmit={onLogin} disabled={disabled} />
    </div>
  );
}

export default Login;
