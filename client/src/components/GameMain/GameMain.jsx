import { useCallback, useState } from "react";
import GameStatus from "../GameStatus/GameStatus";
import styles from "./GameMain.module.css";
import backspaceIcon from "../../assets/backspace.svg";
import dataWordle from "../../data/wordle.json";
import { GAME_STATUS, TILE_STATUS } from "../../constants";

function GameMain({ user }) {
  const getWordForToday = () => {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const index = (dayOfMonth - 1) % dataWordle.length;

    return dataWordle[index];
  };
  const word = getWordForToday();

  const [grid, setGrid] = useState([
    Array(5).fill({ value: "", status: null }),
    Array(5).fill({ value: "", status: null }),
    Array(5).fill({ value: "", status: null }),
    Array(5).fill({ value: "", status: null }),
    Array(5).fill({ value: "", status: null }),
    Array(5).fill({ value: "", status: null }),
  ]);

  const [currentRow, setCurrentRow] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const [statusText, setStatusText] = useState("");

  const [isGameFinished, setIsGameFinished] = useState(false);

  const keyboardRow1 = "qwertyuiop";
  const keyboardRow2 = "asdfghjkl";
  const keyboardRow3 = ["enter", "z", "x", "c", "v", "b", "n", "m"];

  const interpreterLetter = useCallback(
    (letter) => {
      if (isGameFinished) {
        return;
      }

      if (letter === "backspace") {
        removeLetter();
        return;
      }

      if (letter === "enter") {
        verifyAnswer();
        return;
      }
      addLetterToTile(letter);
    },
    [grid, currentRow, isGameFinished]
  );

  const addLetterToTile = useCallback(
    (letter) => {
      let tmpBool = false;
      let tmpGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

      for (let col = 0; col < tmpGrid[currentRow].length; col++) {
        if (tmpGrid[currentRow][col]?.value === "" && !tmpBool) {
          tmpBool = true;
          tmpGrid[currentRow][col].value = letter;
        }
      }
      setGrid(tmpGrid);
      tmpBool = false;
    },
    [grid, currentRow]
  );

  const removeLetter = useCallback(() => {
    let tmpBool = false;
    let tmpGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    for (let col = tmpGrid[currentRow].length - 1; col >= 0; col--) {
      if (tmpGrid[currentRow][col]?.value !== "" && !tmpBool) {
        tmpBool = true;
        tmpGrid[currentRow][col].value = "";
      }
    }
    tmpBool = false;
    setGrid(tmpGrid);
  }, [grid, currentRow]);

  const verifyAnswer = useCallback(() => {
    const answer = grid[currentRow].map((tile) => tile.value).join("");

    if (answer.length !== word.length) {
      showGameStatus();
      setStatusText(GAME_STATUS.NOT_ENOUGH_LETTER);
      return;
    }

    if (!dataWordle.includes(answer)) {
      showGameStatus();
      setStatusText(GAME_STATUS.NO_WORD_IN_LIST);
      return;
    }

    if (word !== answer) {
      changeLetterStatus();
      setCurrentRow((prevRow) => prevRow + 1);
      return;
    }

    if (word === answer) {
      changeLetterStatus();
      winFunction();
      setIsGameFinished(true);
    }
  }, [word, grid, currentRow]);

  const changeLetterStatus = useCallback(() => {
    let tmpGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const splitedWord = word.split("");

    for (let i = 0; i < 5; i++) {
      if (tmpGrid[currentRow][i].value === splitedWord[i]) {
        tmpGrid[currentRow][i].status = TILE_STATUS.CORRECT_SPOT;
        continue;
      }

      if (word.includes(tmpGrid[currentRow][i].value)) {
        tmpGrid[currentRow][i].status = TILE_STATUS.WRONG_SPOT;
        continue;
      }
      tmpGrid[currentRow][i].status = TILE_STATUS.NOT_IN_WORD_SPOT;
    }

    setGrid(tmpGrid);
  }, [word, currentRow, grid]);

  const winFunction = useCallback(() => {
    switch (currentRow) {
      case 0:
        setStatusText(GAME_STATUS.GENIUS);
        break;
      case 1:
        setStatusText(GAME_STATUS.MAGNIFICENT);
        break;
      case 2:
        setStatusText(GAME_STATUS.IMPRESSIVE);
        break;
      case 3:
        setStatusText(GAME_STATUS.SPLENDID);
        break;
      case 4:
        setStatusText(GAME_STATUS.GREAT);
        break;
      case 5:
        setStatusText(GAME_STATUS.PHEW);
        break;
    }
    showGameStatus();
  }, [currentRow]);

  const showGameStatus = useCallback(() => {
    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
    }, 3000);
  }, [showStatus]);

  const tileStyle = useCallback((tileValue, tileStatus) => {
    if (tileStatus === TILE_STATUS.CORRECT_SPOT) {
      return { color: "white", backgroundColor: "#6aaa64" };
    }

    if (tileStatus === TILE_STATUS.WRONG_SPOT) {
      return { color: "white", backgroundColor: "#c9b458" };
    }

    if (tileStatus === TILE_STATUS.NOT_IN_WORD_SPOT) {
      return { color: "white", backgroundColor: "#787c7e" };
    }

    if (tileValue) {
      return { color: "black", border: "solid black" };
    }
    return {};
  }, []);

  return (
    <main className={styles.container}>
      {user && <p className={styles.text}>Pseudo : {user.username}</p>}
      {showStatus && <GameStatus text={statusText} />}
      <div className={styles.main_container}>
        <div className={styles.grid}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((tile, colIndex) => (
                <div
                  key={colIndex}
                  className={styles.tile}
                  style={tileStyle(tile?.value, tile?.status)}
                >
                  {tile.value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.keyboard_container}>
        <div className={styles.keyboard_row}>
          {keyboardRow1.split("").map((letter, index) => (
            <button
              key={index}
              onClick={() => interpreterLetter(letter)}
              className={styles.keyboard_button}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className={styles.keyboard_row}>
          {keyboardRow2.split("").map((letter, index) => (
            <button
              key={index}
              onClick={() => interpreterLetter(letter)}
              className={styles.keyboard_button}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className={styles.keyboard_row}>
          {keyboardRow3.map((letter, index) => (
            <button
              key={index}
              onClick={() => interpreterLetter(letter)}
              className={styles.keyboard_button}
            >
              {letter}
            </button>
          ))}
          <div
            className={styles.backspace}
            onClick={() => interpreterLetter("backspace")}
          >
            <img src={backspaceIcon} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default GameMain;
