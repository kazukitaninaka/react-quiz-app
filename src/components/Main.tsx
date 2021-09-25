import { useState } from "react";
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
import { PlayerData, QuizData, QuizInfo } from "../types";

const Main = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<PlayerData>({
    id: null,
    name: "",
  });
  const [quiz, setQuiz] = useState<QuizInfo[] | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [questionNum, setQuestionNum] = useState<number>(0);
  // const [showNextQuestionButton, setShowNextQuestionButton] =
  //   useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const startGame = () => {
    setGameStarted(true);
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986"
    )
      .then((res) => res.json())
      .then(
        (quizData) => {
          const data = quizData.results.map((quiz: QuizData) => ({
            ...quiz,
            answers: shuffleArray([
              ...quiz.incorrect_answers,
              quiz.correct_answer,
            ]),
          }));
          console.log(data);
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
  const handleAfterAnswering = (correct: boolean) => {
    // setShowNextQuestionButton(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  // const handleQuestionNum = () => {
  //   setQuestionNum((prev) => prev + 1);
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
    setQuestionNum((prev) => prev + 1);
  };

  let content;
  if (!gameStarted && !score) {
    content = (
      <Start
        startGame={startGame}
        setPlayerData={setPlayerData}
        playersName={playerData.name}
      />
    );
  } else if (error) {
    content = <div>{error}</div>;
  } else if (!isLoaded || !quiz) {
    content = <div>Wait a sec</div>;
  } else if (questionNum - 1 >= quiz.length) {
    content = <Result score={score} playerData={playerData} />;
  } else {
    content = (
      <QuestionCard
        questionData={quiz[questionNum - 1]}
        questionNum={questionNum}
        handleAfterAnswering={handleAfterAnswering}
        // showNextQuestionButton={showNextQuestionButton}
        setQuestionNum={setQuestionNum}
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
