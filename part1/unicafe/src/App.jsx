import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const numReviews = good + neutral + bad;
  const avgRating = (good * 1 + bad * -1) / (numReviews || 1);
  const percentPositive = good / (numReviews || 1) * 100;

  if (numReviews) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={numReviews}/>
          <StatisticLine text="average" value={avgRating.toFixed(1)}/>
          <StatisticLine text="positive" value={percentPositive.toFixed(1) + " %"}/>    
        </tbody>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ text, toHandle }) => <button onClick={toHandle}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);

  const addNeutral = () => setNeutral(neutral + 1);

  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <Heading text="give feedback"/>
      <div>
        <Button text="good" toHandle={addGood}/>
        <Button text="neutral" toHandle={addNeutral}/>
        <Button text="bad" toHandle={addBad}/>
      </div>
      <Heading text="statistics"/>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

export default App