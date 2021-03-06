import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";

const Start = ({ startGame, playersNameHandler }) => {
  return (
    <div>
      <h2>Easy Quiz Game!</h2>
      <form>
        <TextField
          id="standard-basic"
          label="Your name"
          autocomplete="off"
          onChange={playersNameHandler}
        />
        <Box display="block" mt={2}>
          <Button color="primary" variant="contained" onClick={startGame}>
            Start
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Start;
