import React from "react";
import { nanoid } from "nanoid"
import Button from './Button';

export default function Question(props) {
  console.log(props)

  const allAnswers = props.all_answers.map(option =>
    <Button
      isSelected={false}
      option={option}
      id={nanoid()}
    />
  )

  return (
    <div className='question-container'>
      <h3> {props.question} </h3>
      {allAnswers}
      <div className="separator-line" />
    </div>
  )
}