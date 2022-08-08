import './App.scss';
import Start from './components/Start';
import Question from './components/Question';
import React from "react";
import { nanoid } from "nanoid"

function App() {
  const [quiz, setQuiz] = React.useState(true)
  const [triviaInfo, setTriviaInfo] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaInfo(data.results))
  }, [])

  function startQuiz() {
    setQuiz(prevQuiz => !prevQuiz)
    setTriviaInfo(prevTriviaInfo =>
      prevTriviaInfo.map(info => {
        return { ...info, id: nanoid() }
      })
    )
  }

  const questionToShow = triviaInfo.map((info) =>
    < Question
      key={info.id}
      question={info.question}
      all_answers={[...info.incorrect_answers, info.correct_answer].sort(() => Math.random() - 0.5)}
      correct_answer={info.correct_answer}
    />
  )

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
