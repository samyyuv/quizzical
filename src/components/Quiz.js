import React from "react";
import { nanoid } from "nanoid"
import Question from './Question';

export default function Quiz() {
  const [triviaInfo, setTriviaInfo] = React.useState([])
  // const [answer, setAnswers] = React.useState(getAllAnswers())


  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaInfo(data.results))

  }, [])
  setTriviaInfo(prevTriviaInfo =>
    prevTriviaInfo.map(info => {
      return { ...info, id: nanoid() }
    }
    )
  )
  //console.log(triviaInfo)

  const questionToShow = triviaInfo.map((info, idx) =>
    < Question
      key={info.key}
      id={info.id}
      question={info.question}
      incorrect_answers={info.incorrect_answers}
      correct_answer={info.correct_answer}
    />
  )

  // function answers(triviaInfo) {
  //   const incorrect_answers = triviaInfo[0].incorrect_answers
  //   const correct_answers = triviaInfo.correct_answers
  //   return (incorrect_answers.split(","))

  // }

  return (
    <div className='quiz-container'>
      {questionToShow}
      <div className="button">
        <button className="hard-button font-inter">Check answers</button>
      </div>

    </div>
  )
}