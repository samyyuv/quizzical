import { useMemo } from "react";
import { decode } from 'html-entities';
import { nanoid } from "nanoid"

export default function Question(props) {
  const shuffledAnswers = useMemo(() => { return props.all_answers.sort(() => Math.random() - 0.5) }, [])

  const allAnswers = shuffledAnswers.map(option => {
    let buttonStatus = props.selectedAnswer == option ? "selected" : "nonChosen"
    let noEvents = ""
    if (props.checking) {
      noEvents = " noEvents"
      props.incorrect_answers.map(incoAnswers => {
        if (option === props.correct_answer) {
          buttonStatus = "correct"
        }
        if (option === incoAnswers) {
          buttonStatus = "review"
        }
        if (option === props.selectedAnswer && option == incoAnswers) {
          buttonStatus = "wrong"
        }
      })
    }
    return (
      <button key={nanoid()} className={buttonStatus + noEvents} onClick={() => { props.handleSelection(props.id, option) }}>
        {decode(option)}
      </button >
    )
  })

  return (
    <div>
      <h3> {decode(props.question)} </h3>
      <div className="button-container">
        {allAnswers}
      </div>
      <div className="separator-line" />
    </div>
  )
}