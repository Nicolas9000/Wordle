import React from "react";
import BurgerIcon from "../../assets/burger.svg";
import SettingIcon from "../../assets/setting.svg";
import StatisticsIcon from "../../assets/statistics.svg";
import styles from "./GameHeader.module.css";
import { useNavigate } from "react-router-dom";

function GameHeader({ setShowModal, user }) {
  const navigate = useNavigate();
  return (
    <header className={styles.header_container}>
      <img className={styles.icon} src={BurgerIcon} />
      <h1 className={styles.title}>Wordle</h1>
      <menu className={styles.menu}>
        {user && (
          <>
            <img
              className={styles.icon}
              src={StatisticsIcon}
              onClick={() => setShowModal(true)}
            />
            <img
              className={styles.icon}
              src={SettingIcon}
              onClick={() => navigate("/user/settings")}
            />
          </>
        )}
      </menu>
    </header>
  );
}

export default GameHeader;
