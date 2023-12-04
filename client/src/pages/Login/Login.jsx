import { useMemo, useCallback } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthService from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import CookieService from "../../services/cookie";

function Login() {
  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);
  const cookieService = useMemo(() => new CookieService(), []);

  const onLogin = useCallback(async (data) => {
    try {
      const loginData = await authService.login(data);
      cookieService.setCookie(loginData.token);
      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <AuthForm onSubmit={onLogin} />;
}

export default Login;
