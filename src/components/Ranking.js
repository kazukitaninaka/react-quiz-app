import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
} from "@material-ui/core";
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{ maxWidth: "15%", fontWeight: "bold" }}
              >
                Rank
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el) => {
              return (
                <TableRow key={el.name}>
                  <TableCell align="center">{el.ranking}</TableCell>
                  <TableCell align="center">{el.name}</TableCell>
                  <TableCell align="center">{el.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Ranking;
