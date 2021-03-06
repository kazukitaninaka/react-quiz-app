import React, { useEffect } from "react";
import firebase from "../firebase";
import { Link } from "@material-ui/core";

const Result = ({ score, playersName }) => {
  // useEffect(() => {
  //   const dataRef = firebase.database().ref("data");
  //   dataRef.push({
  //     name: playersName,
  //     score,
  //   });
  // }, []);

  return (
    <div>
      <h2>Finished!</h2>
      <p>You scored {score} out of 5! Well done!</p>
      <Link href="/" underline="always" style={{ marginRight: "16px" }}>
        Go Back to Top
      </Link>
      <Link href="/ranking" underline="always">
        Go to Ranking Page
      </Link>
    </div>
  );
};

export default Result;
