export interface Question {
  question: string;
  subInfo?: string[];
}

const questions: Question[] = [
  {
    question: "Are you aged between 18 and 65?",
  },
  {
    question: "Do you have any of the following symptoms:",
    subInfo: [
      "Mouth ulcers /lumps lasting more than 3 weeks",
      "Painful red and white patches on the inside of the mouth",
      "Fluid filled blisters/crusts on the lips",
    ],
  },
  {
    question:
      "Are you currently taking any medication (including over the counter, prescription or recreational drugs)?",
  },
  {
    question:
      "Do you have an allergy (hypersensitivity) to medicines containing Aciclovir or Valciclovir or Famacilovir or Penciclovir?",
  },
  {
    question: "Are you pregnant, breast feeding or possibly pregnant?",
  },
];

export const queryQuestions = (): Question[] => {
  return questions;
};
