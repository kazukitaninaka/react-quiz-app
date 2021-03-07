import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { Link, Box } from "@material-ui/core";
import compare from "../utils/compare";

const Result = ({ score, playerData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataRef = firebase.database().ref("data");
    dataRef.on("value", (snapshot) => {
      const rawData = snapshot.val();
      let data = [];
      for (let id in rawData) {
        data.push(rawData[id]);
      }
      setData(data.sort(compare));
    });
  }, []);

  const finishedPlayerIndex = data.findIndex((el) => {
    console.log(el.id);
    console.log(playerData.id);
    return el.id === playerData.id;
  });
  return (
    <div>
      <h2>Finished!</h2>
      <p>You scored {score} out of 5! Well done!</p>
      <div>
        <h2>Ranking</h2>
        {data.map((el, index) => {
          if (finishedPlayerIndex === index) {
            return (
              <Box key={index} fontWeight="fontWeightBold">
                {index + 1}. {el.name}: {el.score} (You)
              </Box>
            );
          } else {
            return (
              <div key={index}>
                {index + 1}. {el.name}: {el.score}
              </div>
            );
          }
        })}
      </div>
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
