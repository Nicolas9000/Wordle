import React from "react";
import styles from "./GameStats.module.css";
import closeIcon from "../../assets/close.svg";

function GameStatsModal({ setShowModal }) {
  return (
    <dialog className={styles.modal_container}>
      <div>
        <img
          src={closeIcon}
          className={styles.icon}
          onClick={() => setShowModal(false)}
        />
        <p className={styles.title}>STATISTICS</p>
        <ul className={styles.stats_container}>
          <li className={styles.stats_col}>
            <div>0</div>
            <div>Played</div>
          </li>
          <li className={styles.stats_col}>
            <div>0</div>
            <div>Win %</div>
          </li>
          <li className={styles.stats_col}>
            <div>0</div>
            <div>Current Streak</div>
          </li>
          <li className={styles.stats_col}>
            <div>0</div>
            <div>Max Streak</div>
          </li>
        </ul>
      </div>
    </dialog>
  );
}

export default GameStatsModal;
