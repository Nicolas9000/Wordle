import { useMemo, useCallback, useEffect, useState } from "react";
import styles from "./UserSettings.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserService from "../../services/user";
import { Link, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required(),
  })
  .required();
function UserSettings() {
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState("");
  const userService = useMemo(() => new UserService(), []);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onUpdate = useCallback(async (data) => {
    setDisabled(true);
    try {
      await userService.updateUser(data);
      setDisabled(false);
      navigate("/game");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    userService.getCurrentUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <Link className={styles.link} to="/game">Back to game</Link>
      <div className={styles.container}>
        <form onSubmit={handleSubmit((data) => onUpdate(data))}>
          <div>
            <label htmlFor="username">Your username</label>

            <input
              id="username"
              type="username"
              defaultValue={user?.username}
              {...register("username")}
              placeholder="Username"
            />
            <p className={styles.text_error}>{errors.username?.message}</p>
          </div>
          <button disabled={disabled} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
