import React from "react";

export default function Start(props) {
  return (
    <div className='start-container'>
      <h1 className="title font-karla">Quizzical</h1>
      <p className="description font-inter">Some description if needed</p>
      <button onClick={props.startQuiz} className="hard-button font-inter">Start quiz</button>
    </div>
  )
}