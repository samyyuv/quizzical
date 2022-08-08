import React from "react";

export default function Button(props) {
  const [answer, setAnswer] = React.useState(props)
  //console.log(props)
  function selectedAnswer() {
    setAnswer(prevAnswer => { return { ...prevAnswer, isSelected: !prevAnswer.isSelected } }
    )
  }

  const buttonStatus = answer.isSelected ? "selected" : "nonChosen"

  return (
    <button className={buttonStatus} onClick={selectedAnswer}> {props.option} </button>
  )
}