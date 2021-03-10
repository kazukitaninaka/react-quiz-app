import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import {
  Link,
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
} from "@material-ui/core";
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
      <h2>Ranking</h2>
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
              if (el.id === playerData.id) {
                return (
                  <TableRow key={el.name}>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {el.ranking}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {el.name} (You)
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      {el.score}
                    </TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow key={el.name}>
                    <TableCell align="center">{el.ranking}</TableCell>
                    <TableCell align="center">{el.name}</TableCell>
                    <TableCell align="center">{el.score}</TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
