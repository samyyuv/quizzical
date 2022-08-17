import { useState, useEffect } from "react";
import './App.scss';
import Question from './components/Question';
import { nanoid } from "nanoid"

const App = () => {
  const startData = {
    questions: "5",
    category: false,
    difficulty: false,
    type: false
  }
  const [quiz, setQuiz] = useState(true)
  const [categories, setCategories] = useState([])
  const [triviaInfo, setTriviaInfo] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [checking, setchecking] = useState(false)
  const [formData, setFormData] = useState(startData)

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
  }, [])

  useEffect(() => {
    fetchInfo()
  }, [formData])

  useEffect(() => {
    setAllQuestions(triviaInfo.map(question => {
      return {
        ...question,
        id: nanoid(),
        selectedAnswer: "",
      }
    }))
    checkAnswers()
  }, [triviaInfo])

  function handleFormData(event) {
    const { id, value } = event.target
    setFormData(prevData => {
      return {
        ...prevData,
        [id]: value
      }
    })
  }

  function fetchInfo() {
    let linkApi = ""
    const starterLink = "https://opentdb.com/api.php?amount=" + `${formData.questions}`
    const category = "&category=" + `${formData.category}`
    const difficulty = "&difficulty=" + `${formData.difficulty}`
    const type = "&type=" + `${formData.type}`

    if (!formData.category && !formData.difficulty && !formData.type || !formData.category && !formData.difficulty && formData.type == "multiple") {
      linkApi = starterLink + "&type=multiple"
    } else if (formData.category && !formData.difficulty && !formData.type) {
      linkApi = starterLink + category
    } else if (!formData.category && formData.difficulty && !formData.type) {
      linkApi = starterLink + difficulty
    } else if (!formData.category && !formData.difficulty && formData.type == "boolean") {
      linkApi = starterLink + type
    } else if (formData.category && formData.difficulty && formData.type) {
      linkApi = starterLink + category + difficulty + type
    } else if (formData.category && formData.difficulty && !formData.type) {
      linkApi = starterLink + category + difficulty
    } else if (formData.category && !formData.difficulty && formData.type) {
      linkApi = starterLink + category + type
    } else if (!formData.category && formData.difficulty && formData.type) {
      linkApi = starterLink + difficulty + type
    }
    fetch(linkApi)
      .then(res => res.json())
      .then(data => setTriviaInfo(data.results))
  }

  function checkAnswers() {
    let answers = 0
    if (allQuestions.every(question => question.selectedAnswer.length > 0) && allQuestions.length) {
      setchecking(true)
      allQuestions.map(question => {
        if (question.selectedAnswer == question.correct_answer) {
          answers++
          setCorrectAnswers(answers)
        } else {
          setCorrectAnswers(answers)
        }
      })
    }
  }

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

  function restart() {
    setQuiz(true)
    setAllQuestions([])
    setCorrectAnswers(0)
    setchecking(false)
    setFormData(startData)
    fetchInfo()
  }

  const questionToShow = allQuestions.map((info) => {
    return (
      < Question
        key={info.id}
        id={info.id}
        question={info.question}
        all_answers={[...info.incorrect_answers, info.correct_answer]}
        correct_answer={info.correct_answer}
        incorrect_answers={info.incorrect_answers}
        selectedAnswer={info.selectedAnswer}
        handleSelection={handleSelection}
        checking={checking}
      />
    )
  })

  return (
    <div className='container'>
      {quiz ?
        <div className='start-container'>
          <h1 className="title font-karla">Quizzical</h1>
          <p className="description font-inter">Quiz your knowledge!</p>
          <div className="options-container">
            <div className="select-container">
              <label htmlFor="questions">Number of Questions (1-50):</label>
              <input className="select-input" id="questions" type="number" min="5" max="50" onChange={handleFormData} />
            </div>

            <div className="select-container">
              <label htmlFor="category">Select Category:</label>
              <select className="select-input" id="category" onChange={handleFormData}>
                <option value="anyCateg">Any Category</option>
                {categories.map(option => {
                  return (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  )
                })}
              </select>
            </div>

            <div className="select-container">
              <label htmlFor="difficulty">Select Difficulty:</label>
              <select className="select-input" id="difficulty" onChange={handleFormData}>
                <option value="anyDiff">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="select-container">
              <label htmlFor="type">Select Type:</label>
              <select className="select-input" id="type" onChange={handleFormData}>
                <option value="anyType">Any Type</option>
                <option value="multiple">Multiple choise</option>
                <option value="boolean">True / False</option>
              </select>
            </div>
          </div>
          <button onClick={startQuiz} className="hard-button font-inter">Start quiz</button>
        </div>

        : <div className='quiz-container'>
          {questionToShow}
          <div className="button">
            {checking && <h3>You scored {correctAnswers}/{formData.questions} correct answers</h3>}
            <button className="hard-button font-inter"
              onClick={checking ? restart : checkAnswers}>
              {checking ? "Play again" : "Check answers"}</button>
          </div>
        </div>
      }
      <div className="container-circles">
        <div className="circle circle-big up"></div>
        <div className="circle circle-small small-up"></div>
        <div className="circle circle-small small-down"></div>
        <div className="circle circle-big down"></div>
      </div>
    </div>
  );
}

export default App;
