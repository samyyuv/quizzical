import React from "react";
import { nanoid } from "nanoid"
import Button from './Button';

export default function Question(props) {
  const [selected, setSelected] = React.useState()

  function selectedAnswer(e, id) {
    setSelected(id)
  }

  const allAnswers = props.all_answers.map(element => {
    return <Button
      key={element.id}
      isSelected={element.id == selected}
      option={element.option}
      selectedAnswer={e => selectedAnswer(e, element.id)}
    />
  })

  return (
    <div className='question-container'>
      <h3> {props.question} </h3>
      {allAnswers}
      <div className="separator-line" />
    </div>
  )
}