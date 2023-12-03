import React from "react";
import GameHeader from "../../components/GameHeader/GameHeader";
import GameMain from "../../components/GameMain/GameMain";
import wordleData from "../../data/wordle.json";

function Game() {

  return (
    <>
      <GameHeader />
      <GameMain />
    </>
  );
}

export default Game;
