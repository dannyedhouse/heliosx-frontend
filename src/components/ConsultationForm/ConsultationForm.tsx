import { useEffect, useState } from "react";
import { Question } from "../../api/queryQuestions";
import { submitAnswers } from "../../api/submitAnswers";
import { Button } from "../Button/Button";
import { RadioField } from "../RadioField/RadioField";

interface ConsultationFormProps {
  questions: Question[];
}

export interface Answer {
  question: string;
  answer: boolean;
}

export const ConsultationForm = ({ questions }: ConsultationFormProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [answers, setAnswers] = useState<Answer[]>(
    questions.map((question) => ({ question: question.question, answer: true }))
  );
  const [isFinalQuestion, setIsFinalQuestion] = useState<boolean>(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleAnswerChange = (answer: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex].answer = answer;
    setAnswers(updatedAnswers);
  };

  const goToPreviousQuestion = () => {
    setQuestionIndex(questionIndex - 1);
    if (isFinalQuestion) {
      setIsFinalQuestion(false);
    }
  };

  const goToNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    setActiveQuestion(questions[questionIndex]);
    if (questionIndex === Object.keys(questions).length - 1) {
      setIsFinalQuestion(true);
    }
  }, [questionIndex, questions]);

  const handleSubmit = () => {
    submitAnswers(answers);
    setIsFormComplete(true);
  };

  const isInvalid = answers[questionIndex] === undefined;

  return !isFormComplete ? (
    <form
      title="consultation form"
      name="consultation form"
      onSubmit={handleSubmit}
      className="max-w-[600px] min-w-[90%] flex flex-col h-full"
    >
      <div className="flex-grow">
        <div className="flex flex-col">
          <h1 className="text-lg">Consultation Form</h1>
          <h2>
            Answer a few questions from our pharmacists to see if you are
            eligible for Genovian Pear Solution.
          </h2>
          <h3>
            <b>{activeQuestion.question}</b>
          </h3>
          {activeQuestion.subInfo?.length && (
            <ul>
              {activeQuestion.subInfo?.map((info) => (
                <li className="list-inside list-disc" key={info}>
                  {info}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <RadioField
            fieldValue="Yes"
            onChange={() => handleAnswerChange(true)}
            checked={answers[questionIndex]?.answer === true}
          />
          <RadioField
            fieldValue="No"
            onChange={() => handleAnswerChange(false)}
            checked={answers[questionIndex]?.answer === false}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-2 bottom-0 sticky mb-20">
        {questionIndex > 0 ? (
          <Button
            variant="primary"
            className="w-full"
            onClick={goToPreviousQuestion}
          >
            Back
          </Button>
        ) : null}

        {isFinalQuestion ? (
          <Button variant="submit" type="submit" className="w-full">
            Submit
          </Button>
        ) : (
          <Button
            variant="primary"
            className="w-full"
            onClick={goToNextQuestion}
            disabled={isInvalid}
          >
            Next
          </Button>
        )}
      </div>
    </form>
  ) : (
    <>
      <p>Thanks for completing!</p>
      <h1>One of our pharmacists will be in touch soon.</h1>
    </>
  );
};
