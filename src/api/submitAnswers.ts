import { Question } from "./queryQuestions";

export const submitAnswers = (answers: boolean[], questions: Question[]) => {
  answers.forEach((answer, i) => {
    console.log(`Question: ${questions[i].question} Answer: ${answer} `);
  });
};
