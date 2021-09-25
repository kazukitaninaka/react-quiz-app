import { useEffect, useState } from "react";
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
import { RankingData } from "../types";

const Ranking = () => {
  const [data, setData] = useState<RankingData[]>([]);
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
            {data.map((person) => {
              return (
                <TableRow key={person.id}>
                  <TableCell align="center">{person.ranking}</TableCell>
                  <TableCell align="center">{person.name}</TableCell>
                  <TableCell align="center">{person.score}</TableCell>
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
