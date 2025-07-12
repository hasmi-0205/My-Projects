import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Rome", "Paris", "London", "Berlin"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "22", "5"],
    answer: "4",
  },
  {
    question: "React is a ___ library.",
    options: ["Backend", "Database", "Frontend", "Full Stack"],
    answer: "Frontend",
  },
  {
    question: "First Women Prime Minister of India?",
    options: ["Indira Gandhi", "Sonia Gandhi", "Pratibha Patil", "Sarojini Naidu"],
    answer: "Indira Gandhi",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale",
  },
  {
    question: "Which country has no night?",
    options: ["Norway", "Sweden", "Finland", "Denmark"],
    answer: "Norway",
  },
  {
    question: "Who is the Man of Cricket?",
    options: ["Sachin Tendulkar", "Virat Kohli", "MS Dhoni", "Rahul Dravid"],
    answer: "Sachin Tendulkar",
  },
  {
    question: "Who is the best Football Player ?",
    options: ["Lionel Messi", "Cristiano Ronaldo", "Pele", "Diego Maradona"],
    answer: "Lionel Messi",
  },
  {
    question: "Who Discovered Java?",
    options: ["James Gosling", "Bjarne Stroustrup", "Guido van Rossum", "Dennis Ritchie"],
    answer: "James Gosling",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "Who is the Microsoft CEO?",
    options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Satya Nadella"],
    answer: "Satya Nadella",
  },
  {
    question: "Who is the Chairman of Google Chrome?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    answer: "Monaco"
  },
  {
    question: "What are the types of Frontend languages?",
    options: ["HTML", "CSS", "JavaScript", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Who is the Co-Founder of Microsoft?",
    options: ["Bill Gates", "Ada Lovelace", "Paul Allen", "Alan Turing"],
    answer: "Bill Gates"
  },
  {
    question: "Who is the Father of Computer Science?",
    options: ["Charles Babbage", "Alan Turing", "Ada Lovelace", "John von Neumann"],
    answer: "Alan Turing"
  },
  {
    question: "Which Language is commonly used to create Websites?",
    options: ["HTML", "java", "python", "All of the above"],
    answer: "HTML"
  },
  {
    question: "What is the full Form of CPU?",
    options: ["Central Processing Unit", "Control Processing Unit", "Computer Personal Unit", "Centralized Processing Unit"],
    answer: "Central Processing Unit",
  },
  {
    question: "Which Software is used to Browse the Internet?",
    options: ["Google Chrome", "Microsoft Word", "Adobe Photoshop", "VLC Media Player"],
    answer: "Google Chrome"
  },

];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (!isSubmitted) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleOptionClick = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);

    // Calculate results
    const total = questions.length;
    const attempted = Object.keys(answers).length;
    const correct = Object.keys(answers).filter(
      (key) => answers[key] === questions[key].answer
    ).length;
    const wrong = attempted - correct;
    const percentage = ((correct / total) * 100).toFixed(2);

    // Navigate to Result page with state
    navigate("/result", {
      state: {
        total,
        attempted,
        correct,
        wrong,
        percentage,
        time,
      },
    });
  };

  return (
    <div style={{
      backgroundColor: "#fff8dc",
      minHeight: "100vh",
      padding: "30px",
      textAlign: "center",
      position: "relative"
    }}>
      {/* Timer */}
      <div style={{
        position: "absolute",
        top: 10,
        right: 20,
        background: "#222",
        color: "#fff",
        padding: "5px 15px",
        borderRadius: "5px"
      }}>
        Time: {time}s
      </div>

      <h2>Question {current + 1} of {questions.length}</h2>

      <table style={{
        margin: "20px auto",
        width: "600px",
        textAlign: "left",
        backgroundColor: "#fff",
        padding: "20px",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold", padding: "10px", width: "50px" }}>
              Q{current + 1}:
            </td>
            <td style={{ padding: "10px", fontSize: "18px" }}>
              {questions[current].question}
            </td>
          </tr>
        </tbody>
      </table>

      {questions[current].options.map((opt, idx) => (
        <div key={idx} style={{ margin: "10px" }}>
          <button
            onClick={() => handleOptionClick(opt)}
            style={{
              padding: "10px 20px",
              width: "300px",
              fontSize: "16px",
              borderRadius: "5px",
              border: answers[current] === opt ? "2px solid green" : "1px solid #ccc",
              backgroundColor: answers[current] === opt ? "#d4edda" : "#f0f0f0",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        {current > 0 && (
          <button onClick={() => setCurrent(current - 1)} style={{ marginRight: "10px" }}>
            Previous
          </button>
        )}
        {current < questions.length - 1 && (
          <button onClick={() => setCurrent(current + 1)}>Next</button>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;
