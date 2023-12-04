import { useMemo, useCallback, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import AuthService from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const authService = useMemo(() => new AuthService(), []);

  const onRegister = useCallback(async (data) => {
    setDisabled(true);
    try {
      await authService.register(data);
      setDisabled(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <AuthForm onSubmit={onRegister} isRegisterPage={true} disabled={disabled}/>;
}

export default Register;
