import React, { useState } from "react";
import { Container, makeStyles, Button } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import Start from "./Start";
import Result from "./Result";
import Header from "./Header";
import Ranking from "./Ranking";
import firebase from "../firebase";

const Main = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState({ id: null, name: "" });
  const [quiz, setQuiz] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [questionNum, setQuestionNum] = useState(0);
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [userAnswerStatus, setUserAnswerStatus] = useState(null);
  const [score, setScore] = useState(0);

  // useEffect(() => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (quizData) => {
  //         setQuiz(quizData.results);
  //         setIsLoaded(true);
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

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
          setQuiz(quizData.results);
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
    // const userAnswer = e.currentTarget.value;

    // const correct = quiz[questionNum - 1].correct_answer === userAnswer;

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleQuestionNum = () => {
    setQuestionNum((prev) => prev + 1);
  };

  // const goNextQuestion = () => {
  //   setShowNextQuestionButton(false);
  //   handleQuestionNum();
  //   setUserAnswerStatus(null);
  // };

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
  //style
  // const useStyles = makeStyles({
  //   root: {
  //     margin: "0 auto",
  //   },
  // });
  // const classes = useStyles();

  let content;
  if (!gameStarted && !score) {
    content = (
      <Start startGame={startGame} handlePlayerData={handlePlayerData} />
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
    <BrowserRouter>
      <Header />
      <Container maxWidth="sm">
        <Switch>
          <Route exact path="/">
            {content}
          </Route>
          <Route path="/ranking">
            <Ranking />
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Main;
