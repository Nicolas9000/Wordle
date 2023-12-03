import React from "react";
import styles from "./GameMain.module.css";
import backspaceIcon from "../../assets/backspace.svg";

function GameMain() {
  const row = ["", "", "", "", "", ""];
  const test = ["", "", "", "", ""];

  const keyboardRow1 = "qwertyuiop";
  const keyboardRow2 = "asdfghjkl";
  const keyboardRow3 = ["enter", "z", "x", "c", "v", "b", "n", "m"];

  return (
    <main>
      <div className={styles.main_container}>
        <div className={styles.grid}>
          {row.map(() => (
            <div className={styles.row}>
              {test.map(() => (
                <div className={styles.tile}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.keyboard_container}>
        <div className={styles.keyboard_row}>
          {keyboardRow1.split("").map((letter) => (
            <button className={styles.keyboard_button}>{letter}</button>
          ))}
        </div>
        <div className={styles.keyboard_row}>
          {keyboardRow2.split("").map((letter) => (
            <button className={styles.keyboard_button}>{letter}</button>
          ))}
        </div>
        <div className={styles.keyboard_row}>
          {keyboardRow3.map((letter) => (
            <button className={styles.keyboard_button}>{letter}</button>
          ))}
          <div className={styles.backspace}>
            <img src={backspaceIcon} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default GameMain;
