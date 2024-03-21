import React, { useState } from "react";

const QUESTIONS = [
  {
    question: "2*(4+4) sonucu nedir?",
    answers: ["2", "4", "8", "16"],
    correct: 3,
  },
  {
    question: "9*9 sonucu nedir?",
    answers: ["18", "81", "80", "79"],
    correct: 1,
  },
  {
    question: "Formula 1'in 2022 şampiyonu kimdir?",
    answers: [
      "Max Verstappen",
      "Charles Leclerd",
      "Lewis Hamilton",
      "Lando Norris",
    ],
    correct: 0,
  },
  {
    question: "Formula 1 takviminde ilk sırada hangi grand prix vardır?",
    answers: [
      "Bahreyn Grand Prix",
      "Suudi Arabistan Grand Prix",
      "Avustralya Grand Prix",
      "Emilia Romagna Grand Prix",
    ],
    correct: 0,
  },
  {
    question: "Hangisi Formula 1 takımlarından değildir?",
    answers: [
      "Ford-AMG F1 Team",
      "Alfa Romeo F1 Team Orlen",
      "BWT Alpine F1 Team",
      "Oracle Red Bull Racing",
    ],
    correct: 0,
  },
];

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Quiz questions={QUESTIONS} />
    </div>
  );
}

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill(null)
  );

  const handleAnswerClick = (answerIndex) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(updatedUserAnswers);
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((userAnswer, index) => {
      if (userAnswer === questions[index].correct) {
        score++;
      }
    });
    return (score / questions.length) * 100;
  };

  const renderQuestion = (question, index) => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" key={index}>
      <h3 className="text-xl mb-4">{question.question}</h3>
      {question.answers.map((answer, answerIndex) => (
        <button
          key={answerIndex}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mr-2"
          onClick={() => handleAnswerClick(answerIndex)}
        >
          {answer}
        </button>
      ))}
    </div>
  );

  if (currentQuestion < questions.length) {
    return renderQuestion(questions[currentQuestion], currentQuestion);
  } else {
    const score = calculateScore();
    return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Sınav Tamamlandı!</h2>
        <p className="text-xl">Puanınız: {score}%</p>
      </div>
    );
  }
};

export default App;
