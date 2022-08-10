import { useState, useEffect } from "react";
import './App.scss';
import Start from './components/Start';
import Question from './components/Question';
import { nanoid } from "nanoid"

const App = () => {
  const [quiz, setQuiz] = useState(true)
  const [triviaInfo, setTriviaInfo] = useState([])
  const [allQuestions, setAllQuestions] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaInfo(data.results))
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
  //console.log(allQuestions)

  const questionToShow = allQuestions.map((info) => {
    return (
      < Question
        key={info.id}
        id={info.id}
        question={info.question}
        all_answers={[...info.incorrect_answers, info.correct_answer]}
        correct_answer={info.correct_answer}
        selectedAnswer={info.selectedAnswer}
        handleSelection={handleSelection}
      />
    )
  })

  return (
    <div className='container'>
      {/* <div className="circle circle-big up"></div>
      <div className="circle circle-small small-up"></div>
      <div className="circle circle-small small-down"></div>
      <div className="circle circle-big down"></div> */}
      {quiz ? <Start startQuiz={(e) => startQuiz()} />
        : <div className='quiz-container'>
          {questionToShow}
          <div className="button">
            <button className="hard-button font-inter">Check answers</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
