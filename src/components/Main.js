import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import Start from "./Start";
import Result from "./Result";
import Header from "./Header";
import Footer from "./Footer";
import Ranking from "./Ranking";
import firebase from "../firebase";
import shuffleArray from "../utils/shuffle";

const Main = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState({ id: null, name: "" });
  const [quiz, setQuiz] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [questionNum, setQuestionNum] = useState(0);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [score, setScore] = useState(0);

  const handlePlayerData = (e) => {
    setPlayerData({ id: Date.now(), name: e.target.value });
    console.log(playerData);
  };
  const startGame = () => {
    setGameStarted(true);
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then(
        (quizData) => {
          const data = quizData.results.map((quiz) => ({
            ...quiz,
            answers: shuffleArray([
              ...quiz.incorrect_answers,
              quiz.correct_answer,
            ]),
          }));
          setQuiz(data);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setQuestionNum(1);
  };
  const handleAfterAnswering = (correct) => {
    setShowNextQuestionButton(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleQuestionNum = () => {
    setQuestionNum((prev) => prev + 1);
  };

  const finishGame = () => {
    // send score to db
    const dataRef = firebase.database().ref("data");
    dataRef.push({
      name: playerData.name,
      id: playerData.id,
      score,
    });

    // finish game
    handleQuestionNum();
  };

  let content;
  if (!gameStarted && !score) {
    content = (
      <Start
        startGame={startGame}
        handlePlayerData={handlePlayerData}
        playersName={playerData.name}
      />
    );
  } else if (error) {
    content = <div>{error.message}</div>;
  } else if (!isLoaded) {
    content = <div>Wait a sec</div>;
  } else if (questionNum - 1 >= quiz.length) {
    content = <Result score={score} playerData={playerData} />;
  } else {
    content = (
      <QuestionCard
        questionData={quiz[questionNum - 1]}
        questionNum={questionNum}
        handleAfterAnswering={handleAfterAnswering}
        showNextQuestionButton={showNextQuestionButton}
        handleQuestionNum={handleQuestionNum}
        finishGame={finishGame}
      />
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: "1" }}>
        <Header />
        <Container maxWidth="sm">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                {content}
              </Route>
              <Route path="/ranking">
                <Ranking />
              </Route>
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
