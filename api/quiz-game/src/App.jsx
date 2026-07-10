import { useState } from "react";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError("");
      setShowResult(false);
      setCurrentIndex(0);
      setScore(0);
      setSelectedAnswer(null);

      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch questions.");
      }

      const data = await response.json();

      const formattedQuestions = data.results.map((q) => ({
        question: decodeHtml(q.question),
        correct_answer: decodeHtml(q.correct_answer),
        answers: shuffleArray([
          ...q.incorrect_answers.map((ans) => decodeHtml(ans)),
          decodeHtml(q.correct_answer),
        ]),
      }));

      setQuestions(formattedQuestions);
    } catch {
      setError("Unable to load quiz questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    setQuizStarted(true);
    await fetchQuestions();
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === questions[currentIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = async () => {
    await fetchQuestions();
  };

  if (!quizStarted) {
    return (
      <div className="app">
        <div className="quiz-card">
          <h1>Trivia Quiz Game</h1>
          <p>Test your knowledge with questions from an API.</p>
          <button className="start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="app">
        <div className="quiz-card">
          <h2>Loading questions...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="quiz-card">
          <h2>{error}</h2>
          <button className="start-btn" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="app">
        <div className="quiz-card">
          <h1>Quiz Finished</h1>
          <p className="score-text">
            Your Score: {score} / {questions.length}
          </p>
          <button className="start-btn" onClick={restartQuiz}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="app">
      <div className="quiz-card">
        <h1>Trivia Quiz Game</h1>
        <p className="question-count">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <h2 className="question">{currentQuestion.question}</h2>

        <div className="answers">
          {currentQuestion.answers.map((answer, index) => {
            let buttonClass = "answer-btn";

            if (selectedAnswer) {
              if (answer === currentQuestion.correct_answer) {
                buttonClass += " correct";
              } else if (answer === selectedAnswer) {
                buttonClass += " wrong";
              }
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!selectedAnswer}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <button className="next-btn" onClick={handleNextQuestion}>
            {currentIndex + 1 === questions.length ? "See Result" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}