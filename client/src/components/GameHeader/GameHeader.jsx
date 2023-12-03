import React from "react";
import BurgerIcon from "../../assets/burger.svg";
import QuestionIcon from "../../assets/question.svg";
import SettingIcon from "../../assets/setting.svg";
import StatisticsIcon from "../../assets/statistics.svg";
import styles from "./GameHeader.module.css";

function GameHeader() {
  return (
    <header className={styles.header_container}>
      <img src={BurgerIcon} />
      <h1 className={styles.title}>Wordle</h1>
      <menu className={styles.menu}>
        <img src={QuestionIcon} />
        <img src={StatisticsIcon} />
        <img src={SettingIcon} />
      </menu>
    </header>
  );
}

export default GameHeader;
