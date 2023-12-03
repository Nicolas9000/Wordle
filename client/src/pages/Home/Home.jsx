import React from "react";
import { Link } from "react-router-dom";
import WordleIcon from "../../assets/wordle.svg";
import styles from "./Home.module.css";

function Home() {
  const currentDate = new Date();

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <main className={styles.main_container}>
      <img className={styles.icon} src={WordleIcon} alt="wordle_icon" />
      <h1 className={styles.title}>Wordle</h1>
      <h2 className={styles.second_title}>Get 6 chances to guess a 5-letter word.</h2>

      <nav className={styles.navbar}>
        <Link className={styles.light_button}>How to play</Link>
        <Link className={styles.light_button}>Log in</Link>
        <Link to="/game" className={styles.dark_button}>Play</Link>
      </nav>

      <h3 className={styles.third_title}>{formattedDate}</h3>
      <p className={styles.text}>No. 895</p>
      <p className={styles.text}>Edited by Tracy Bennett</p>
    </main>
  );
}

export default Home;
