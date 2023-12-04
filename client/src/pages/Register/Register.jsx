import { useMemo, useCallback } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthService from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);

  const onRegister = useCallback(async (data) => {
    try {
      await authService.register(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <AuthForm onSubmit={onRegister} isRegisterPage={true} />;
}

export default Register;
