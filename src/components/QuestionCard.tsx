import React, { useState, Dispatch, SetStateAction } from "react";
import { makeStyles, Box, Button } from "@material-ui/core";
import { QuizInfo, UserAnswerStatus } from "../types";

type Props = {
  questionData: QuizInfo;
  setQuestionNum: Dispatch<SetStateAction<number>>;
  handleAfterAnswering: (correct: boolean) => void;
  questionNum: number;
  finishGame: () => void;
};

const QuestionCard = ({
  questionData,
  handleAfterAnswering,
  setQuestionNum,
  questionNum,
  finishGame,
}: Props) => {
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [userAnswerStatus, setUserAnswerStatus] =
    useState<UserAnswerStatus>("notAnsweredYet");
  // could be either "correct", "incorrect", or null
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    setUserAnswerStatus("notAnsweredYet");
    setShowNextQuestionButton(false);
    setShowResultButton(false);
    setQuestionNum((prev) => prev + 1);
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
      <h3>{decodeURIComponent(questionData.question)}</h3>
      {questionData.answers.map((answer, index) => {
        let buttonVariant: "outlined" | "contained" = "outlined";
        let buttonColor: "primary" | "secondary" = "primary";
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
          default:
            buttonVariant = "outlined";
            buttonColor = "primary";
            emoji = null;
        }
        return (
          <Box my={1} key={index}>
            <Button
              className={
                userAnswerStatus !== "notAnsweredYet"
                  ? buttonStyle.root
                  : undefined
              }
              variant={buttonVariant}
              color={buttonColor}
              fullWidth
              value={answer}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                checkAnswer(e)
              }
            >
              {decodeURIComponent(answer)} {emoji}
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
