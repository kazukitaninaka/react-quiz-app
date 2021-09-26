import React, { Dispatch, SetStateAction } from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { PlayerData } from "../types";

type Props = {
  startGame: () => void;
  setPlayerData: Dispatch<SetStateAction<PlayerData>>;
  playersName: string;
};

const Start = ({ startGame, setPlayerData, playersName }: Props) => {
  // Enabling pressing enter to start game
  const handleStartGame = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      startGame();
    }
  };
  return (
    <div>
      <h2>Easy Quiz Game!</h2>
      <form>
        <TextField
          id="standard-basic"
          label="Your name"
          autoComplete="off"
          onChange={(e) =>
            setPlayerData({ id: Date.now(), name: e.target.value })
          }
          value={playersName}
          onKeyPress={handleStartGame}
        />
        <Box display="block" mt={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={startGame}
            disabled={playersName === ""}
          >
            Start
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Start;
