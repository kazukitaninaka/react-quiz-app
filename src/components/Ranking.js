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
      // sort data
      data.sort(compare);
      // add ranking field to data
      data.forEach((el) => {
        el.ranking = null;
      });

      data.forEach((el, index) => {
        if (index === 0) {
          data[index].ranking = index + 1;
        } else if (el.score === data[index - 1].score) {
          data[index].ranking = data[index - 1].ranking;
          console.log(data);
        } else {
          data[index].ranking = data[index - 1].ranking + 1;
        }
      });
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
