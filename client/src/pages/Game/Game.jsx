import { useMemo, useEffect, useState } from "react";

import GameHeader from "../../components/GameHeader/GameHeader";
import GameMain from "../../components/GameMain/GameMain";
import GameStatsModal from "../../components/GameStatsModal/GameStatsModal";
import UserService from "../../services/user";

function Game() {
  const [user, setUser] = useState("");

  const [showModal, setShowModal] = useState(false);
  const userService = useMemo(() => new UserService(), []);

  useEffect(() => {
    userService.getCurrentUser().then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <>
      <GameHeader setShowModal={setShowModal} user={user} />
      <GameMain user={user} />
      {showModal && <GameStatsModal setShowModal={setShowModal} />}
    </>
  );
}

export default Game;
