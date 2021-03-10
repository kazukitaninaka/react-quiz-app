import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { Link, Box } from "@material-ui/core";
import addRankingToData from "../utils/addRankingToData";

const Result = ({ score, playerData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataRef = firebase.database().ref("data");
    dataRef.on("value", (snapshot) => {
      const rawData = snapshot.val();
      const data = addRankingToData(rawData);
      setData(data);
    });
  }, []);

  return (
    <div>
      <h2>Finished!</h2>
      <p>You scored {score} out of 5! Well done!</p>
      <div>
        <h2>Ranking</h2>
        {data.map((el, index) => {
          if (el.id === playerData.id) {
            return (
              <Box key={index} fontWeight="fontWeightBold">
                {el.ranking}. {el.name}: {el.score} (You)
              </Box>
            );
          } else {
            return (
              <div key={index}>
                {el.ranking}. {el.name}: {el.score}
              </div>
            );
          }
        })}
      </div>
      <Box mt={2}>
        <Link
          href="/"
          underline="always"
          style={{ marginRight: "16px", marginTop: "16px" }}
        >
          Go Back to Top
        </Link>
        <Link href="/ranking" underline="always">
          Go to Ranking Page
        </Link>
      </Box>
    </div>
  );
};

export default Result;
