import React, { useState } from "react";
import { makeStyles, Box, Button } from "@material-ui/core";

const QuestionCard = ({
  questionData,
  handleAfterAnswering,
  handleQuestionNum,
  questionNum,
  finishGame,
}) => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [userAnswerStatus, setUserAnswerStatus] = useState(null);
  // could be either "correct", "incorrect", or null
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  const potentialAnswers = [
    ...questionData.incorrect_answers,
    questionData.correct_answer,
  ];

  const checkAnswer = (e) => {
    if (questionNum === 5) {
      setShowResultButton(true);
    } else {
      setShowNextQuestionButton(true);
    }

    const userAnswer = e.currentTarget.value;

    const correct = questionData.correct_answer === userAnswer;

    handleAfterAnswering(correct);

    setUserAnswerStatus(correct ? "correct" : "incorrect");

    setUserAnswer(userAnswer);
  };
  // handle correct incorrect statement
  let correctStatement = null;
  if (userAnswerStatus === "correct") correctStatement = <h3>🎉Correct!</h3>;
  if (userAnswerStatus === "incorrect")
    correctStatement = <h3>😭Incorrect...</h3>;

  const goNextQuestion = () => {
    setUserAnswerStatus(null);
    setShowNextQuestionButton(false);
    setShowResultButton(false);
    handleQuestionNum();
  };

  //style
  const useStyles = makeStyles({
    root: {
      pointerEvents: "none",
    },
  });

  const buttonStyle = useStyles();

  return (
    <div>
      <p>Q{questionNum}/5</p>
      <h3>{questionData.question.replace(/&quot;/g, '"')}</h3>
      {potentialAnswers.map((answer, index) => {
        let buttonVariant = "outlined";
        let buttonColor = "primary";
        let emoji = null;
        switch (userAnswerStatus) {
          case "correct":
            if (answer === userAnswer) {
              buttonVariant = "contained";
              buttonColor = "primary";
              emoji = "🙆‍";
            }
            break;
          case "incorrect":
            if (answer === userAnswer) {
              buttonVariant = "contained";
              buttonColor = "secondary";
              emoji = "🙅‍♀️";
            } else if (answer === questionData.correct_answer) {
              buttonVariant = "contained";
              buttonColor = "primary";
              emoji = "🙆‍";
            }
            break;
        }
        return (
          <Box my={1} key={index}>
            <Button
              className={userAnswerStatus ? buttonStyle.root : null}
              variant={buttonVariant}
              color={buttonColor}
              disableelevation
              fullWidth
              value={answer}
              onClick={checkAnswer}
            >
              {answer.replace(/&quot;/g, '"')} {emoji}
            </Button>
          </Box>
        );
      })}
      {correctStatement}
      {showNextQuestionButton ? (
        <Button variant="contained" color="primary" onClick={goNextQuestion}>
          Next Question
        </Button>
      ) : showResultButton ? (
        <Button variant="contained" color="primary" onClick={finishGame}>
          Result
        </Button>
      ) : null}
    </div>
  );
};

export default QuestionCard;
