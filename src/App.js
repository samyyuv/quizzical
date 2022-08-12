import { useState, useEffect } from "react";
import './App.scss';
import Start from './components/Start';
import Question from './components/Question';
import { nanoid } from "nanoid"

const App = () => {
  const [quiz, setQuiz] = useState(false)
  const [triviaInfo, setTriviaInfo] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [cheking, setCheking] = useState(false)

  useEffect(() => {
    fetchInfo()
  }, [])

  useEffect(() => {
    setAllQuestions(triviaInfo.map(question => {
      return {
        ...question,
        id: nanoid(),
        selectedAnswer: "",
      }
    }))
  }, [triviaInfo])


  useEffect(() => {
    checkAnswers()
  }, [cheking])

  const allAnswerd = allQuestions.every(question => question.selectedAnswer.length > 0)

  function fetchInfo() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaInfo(data.results))
  }

  function checkAnswers() {
    let answers = 0
    if (allAnswerd && allQuestions.length) {
      setCheking(true)
      allQuestions.map(question => {
        if (question.selectedAnswer == question.correct_answer) {
          answers++
          setCorrectAnswers(answers)
        } else {
          setCorrectAnswers(answers)
        }
      })
    }
  }

  function startQuiz() {
    setQuiz(prevQuiz => !prevQuiz)
  }

  const handleSelection = (questionId, answer) => {
    setAllQuestions(prevQuestions => (
      prevQuestions.map(question => (
        question.id == questionId ? { ...question, selectedAnswer: answer } : question
      ))
    ))
  }

  function restart() {
    setQuiz(true)
    setAllQuestions([])
    setCorrectAnswers(0)
    setCheking(false)
    fetchInfo()
  }

  const questionToShow = allQuestions.map((info) => {
    return (
      < Question
        key={info.id}
        id={info.id}
        question={info.question}
        all_answers={[...info.incorrect_answers, info.correct_answer]}
        correct_answer={info.correct_answer}
        incorrect_answers={info.incorrect_answer}
        selectedAnswer={info.selectedAnswer}
        handleSelection={handleSelection}
        checking={cheking}
      />
    )
  })

  return (
    <div className='container'>
      {quiz ? <Start startQuiz={(e) => startQuiz()} />
        : <div className='quiz-container'>
          {questionToShow}
          <div className="button">
            {cheking && <h3>You scored {correctAnswers}/5 correct answers</h3>}
            <button className="hard-button font-inter"
              onClick={cheking ? restart : checkAnswers}>
              {cheking ? "Play again" : "Check answers"}</button>
          </div>
        </div>
      }
      <div className="container-circles">
        <div className="circle circle-big up"></div>
        <div className="circle circle-small small-up"></div>
        <div className="circle circle-small small-down"></div>
        <div className="circle circle-big down"></div>
      </div>
    </div>
  );
}

export default App;
