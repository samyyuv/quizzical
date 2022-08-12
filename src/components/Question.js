import { useMemo } from "react";
import { decode } from 'html-entities';
import { nanoid } from "nanoid"

export default function Question(props) {
  const shuffledAnswers = useMemo(() => { return props.all_answers.sort(() => Math.random() - 0.5) }, [])

  const allAnswers = shuffledAnswers.map(option => {
    const buttonStatus = props.selectedAnswer == option ? "selected" : "nonChosen"

    return (
      <button key={nanoid()} className={buttonStatus} onClick={() => { props.handleSelection(props.id, option) }
      }>
        {decode(option)}</button >
    )
  })

  return (
    <div className='question-container'>
      <h3> {decode(props.question)} </h3>
      <div className="button-container">
        {allAnswers}
      </div>
      <div className="separator-line" />
    </div>
  )
}