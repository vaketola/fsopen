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

const Statistics = ({ name, value, unit }) => {
  return (
    <div>
      {name} {value} {unit}
    </div>
  )
}

const App = () => {
  const [good,    setGood]    = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,     setBad]     = useState(0)
  //console.log(good)

  if (good+neutral+bad > 0) {
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
        <Statistics name="good"     value={good} />
        <Statistics name="neutral"  value={neutral} />
        <Statistics name="bad"      value={bad} />
        <Statistics name="all"      value={good+neutral+bad} />
        <Statistics name="average"  value={(good-bad)/(good+neutral+bad)} />
        <Statistics name="positive" value={100*good/(good+neutral+bad)} unit="%"/>
      </div>
    )
  }
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
      <Statistics name="No feedback given" />
    </div>
  )
}


export default App
