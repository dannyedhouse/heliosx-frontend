import { useState } from "react";
import { Question } from "../../api/queryQuestions";
import { submitAnswers } from "../../api/submitAnswers";
import { Button } from "../Button/Button";
import { RadioField } from "../RadioField/RadioField";

interface ConsultationFormProps {
  questions: Question[];
}

export const ConsultationForm = ({ questions }: ConsultationFormProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>(
    Array(questions.length).fill(true)
  );
  const [isFormComplete, setIsFormComplete] = useState(false);
  const isFinalQuestion = questions.length === questionIndex + 1;

  const handleAnswerChange = (answer: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const goToPreviousQuestion = () => {
    setQuestionIndex(questionIndex - 1);
  };

  const goToNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };

  const handleSubmit = () => {
    submitAnswers(answers, questions);
    setIsFormComplete(true);
  };

  const isInvalid = answers[questionIndex] === undefined;

  return !isFormComplete ? (
    <form
      title="consultation form"
      name="consultation form"
      onSubmit={handleSubmit}
      className="max-w-[600px] flex flex-col h-[80%] w-full lg:min-w-[600px]"
    >
      <div className="flex-grow">
        <div className="flex flex-col gap-2">
          <div className="mb-4">
            <h1 className="text-lg">Consultation Form</h1>
            <h2 className="text-sm">
              Answer a few questions from our pharmacists to see if you are
              eligible for Genovian Pear Solution.
            </h2>
          </div>
          <div className="mb-4">
            <h3>
              <b>{questions[questionIndex].question}</b>
            </h3>
            {questions[questionIndex].subInfo?.length && (
              <ul className="text-xs">
                {questions[questionIndex].subInfo?.map((info) => (
                  <li className="list-inside list-disc" key={info}>
                    {info}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <RadioField
            fieldValue="Yes"
            onChange={() => handleAnswerChange(true)}
            checked={answers[questionIndex] === true}
          />
          <RadioField
            fieldValue="No"
            onChange={() => handleAnswerChange(false)}
            checked={answers[questionIndex] === false}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-2 bottom-0 sticky pb-8">
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
          <Button
            variant="submit"
            type="submit"
            className="w-full"
            key="submit"
          >
            Submit
          </Button>
        ) : (
          <Button
            key="next"
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
    <div className="w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="text-green-600 w-28 h-28"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-3xl font-bold">Thanks for completing!</p>
      <h1>One of our pharmacists will be in touch soon.</h1>
    </div>
  );
};
