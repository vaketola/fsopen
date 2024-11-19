import { useState } from 'react'


const FeedbackButton = ({ value, setter, name }) => {
  return (
    <>
      <button onClick={() => setter(value + 1)}>
        {name}
      </button>
    </>
  )
}

const Statistics = ({ name, value }) => {
  return (
    <div>
      {name} {value}
    </div>
  )
}

const App = () => {
  const [good,    setGood]    = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,     setBad]     = useState(0)
  //console.log(good)

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <FeedbackButton value={good}    setter={setGood}    name="good" />
      <FeedbackButton value={neutral} setter={setNeutral} name="neutral" />
      <FeedbackButton value={bad}     setter={setBad}     name="bad" />
      <h1>
        statistics
      </h1>
      <Statistics name="good"    value={good} />
      <Statistics name="neutral" value={neutral} />
      <Statistics name="bad"     value={bad} />
    </div>
  )
}


export default App
