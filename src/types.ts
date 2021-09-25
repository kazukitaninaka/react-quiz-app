export type PlayerData = {
  id: number | null;
  name: string;
};

export type QuizData = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuizInfo = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

export type UserAnswerStatus = "correct" | "incorrect" | "notAnsweredYet";
