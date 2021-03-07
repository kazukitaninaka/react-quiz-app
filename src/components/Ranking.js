import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import compare from "../utils/compare";

const Ranking = () => {
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

  return (
    <div>
      <h2>Ranking Page</h2>
      {data.map((el, index) => (
        <div key={index}>
          {index + 1}. {el.name}: {el.score}
        </div>
      ))}
    </div>
  );
};

export default Ranking;
