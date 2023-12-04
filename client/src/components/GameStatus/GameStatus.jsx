import React from "react";
import styles from "./GameStatus.module.css";

function GameStatus({ text }) {
  return (
    <div className={styles.toast_container}>
      <div className={styles.toast}>{text}</div>
    </div>
  );
}

export default GameStatus;
