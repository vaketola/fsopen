import { useState } from 'react'


const Button = ({ value, setter, name }) => {
  return (
    <>
      <button onClick={() => setter(value + 1)}>
        {name}
      </button>
    </>
  )
}

const StatisticLine = ({ name, value, unit }) => {
  return (
    <div>
      {name} {value} {unit}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
        <StatisticLine name="good"     value={good} />
        <StatisticLine name="neutral"  value={neutral} />
        <StatisticLine name="bad"      value={bad} />
        <StatisticLine name="all"      value={good+neutral+bad} />
        <StatisticLine name="average"  value={(good-bad)/(good+neutral+bad)} />
        <StatisticLine name="positive" value={100*good/(good+neutral+bad)} unit="%"/>
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
        <Button value={good}    setter={setGood}    name="good" />
        <Button value={neutral} setter={setNeutral} name="neutral" />
        <Button value={bad}     setter={setBad}     name="bad" />
        <h1>
          statistics
        </h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button value={good}    setter={setGood}    name="good" />
      <Button value={neutral} setter={setNeutral} name="neutral" />
      <Button value={bad}     setter={setBad}     name="bad" />
      <h1>
        statistics
      </h1>
      <StatisticLine name="No feedback given" />
    </div>
  )
}


export default App
