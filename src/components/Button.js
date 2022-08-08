import React from "react";

export default function Button(props) {
  const buttonStatus = props.isSelected ? "selected" : "nonChosen"

  return (
    <button className={buttonStatus} onClick={props.selectedAnswer}> {props.option} </button>
  )
}