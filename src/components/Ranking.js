import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import addRankingToData from "../utils/addRankingToData";

const Ranking = () => {
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
      <h2>Ranking Page</h2>
      {data.map((el, index) => {
        return (
          <div key={index}>
            {el.ranking}. {el.name}: {el.score}
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
