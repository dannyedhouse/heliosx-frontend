import { fireEvent, render, screen } from "@testing-library/react";
import { Question } from "../../api/queryQuestions";
import { ConsultationForm } from "./ConsultationForm";

describe("ConsultationForm", () => {
  const questions: Question[] = [
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
  ];

  it("renders the form showing the first question provided", () => {
    render(<ConsultationForm questions={questions} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Consultation Form" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Answer a few questions from our pharmacists to see if you are eligible for Genovian Pear Solution.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: questions[0].question,
      })
    ).toBeInTheDocument();
  });

  it("renders the initial form controls - radio buttons and 'Next' button, with the 'Yes' radio button checked by default", () => {
    render(<ConsultationForm questions={questions} />);

    expect(screen.getByRole("radio", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "No" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Yes" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("should render sub-info for a question if present in the question data", () => {
    render(<ConsultationForm questions={questions} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(3);
  });

  it("user can navigate to next question until the final question, when a submit button is present instead", () => {
    render(<ConsultationForm questions={questions} />);
    let questionCount = 0;

    const nextButton = screen.getByRole("button", { name: "Next" });
    const question = screen.getByRole("heading", {
      name: questions[questionCount].question,
    });

    expect(question).toBeInTheDocument();
    fireEvent.click(nextButton);
    questionCount++;

    expect(question).toBeInTheDocument();
    fireEvent.click(nextButton);
    questionCount++;

    expect(question).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("user can navigate to previous question, until the first question where only the next button is present ", () => {
    render(<ConsultationForm questions={questions} />);
    let questionCount = 0;
    const question = screen.getByRole("heading", {
      name: questions[questionCount].question,
    });

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(
      screen.queryByRole("button", { name: "Back" })
    ).not.toBeInTheDocument();

    fireEvent.click(nextButton);
    questionCount++;
    expect(question).toBeInTheDocument();

    const previousButton = screen.getByRole("button", { name: "Back" });
    expect(previousButton).toBeInTheDocument();

    fireEvent.click(previousButton);
    questionCount--;
    expect(question).toBeInTheDocument();
    expect(previousButton).not.toBeInTheDocument();
  });

  it("navigating between the questions will keep the previously set radio button", () => {
    render(<ConsultationForm questions={questions} />);

    const yesRadioBtn = screen.getByRole("radio", { name: "Yes" });
    const noRadioBtn = screen.getByRole("radio", { name: "No" });
    const nextButton = screen.getByRole("button", { name: "Next" });

    fireEvent.select(yesRadioBtn); // Question 1
    fireEvent.click(nextButton);
    fireEvent.click(noRadioBtn); // Question 2
    fireEvent.click(nextButton);
    fireEvent.click(yesRadioBtn); // Final question

    const previousButton = screen.getByRole("button", { name: "Back" });
    fireEvent.click(previousButton);

    expect(noRadioBtn).toBeChecked();
    expect(yesRadioBtn).not.toBeChecked();
    fireEvent.click(previousButton);
    expect(yesRadioBtn).toBeChecked();
    expect(noRadioBtn).not.toBeChecked();
    fireEvent.click(nextButton);
    expect(noRadioBtn).toBeChecked();
    expect(yesRadioBtn).not.toBeChecked();
  });

  it("upon form submission, a confirmation message is shown and user inputs are logged to the console", () => {
    render(<ConsultationForm questions={questions} />);
    const yesRadioBtn = screen.getByRole("radio", { name: "Yes" });
    const noRadioBtn = screen.getByRole("radio", { name: "No" });
    const nextButton = screen.getByRole("button", { name: "Next" });
    console.log = jest.fn();

    fireEvent.select(yesRadioBtn); // Question 1
    fireEvent.click(nextButton);
    fireEvent.click(noRadioBtn); // Question 2
    fireEvent.click(nextButton);
    fireEvent.click(yesRadioBtn); // Final question
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(console.log).toHaveBeenCalledWith([
      { question: questions[0].question, answer: true },
      {
        question: questions[1].question,
        answer: false,
      },
      {
        question: questions[2].question,
        answer: true,
      },
    ]);
  });
});
