import { useState } from 'react'

const StatisticLine = ({ text, counter}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{counter}</td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return <div>No feedback given</div>
  }

  const average = (good - bad) / all
  const positive = good * 100 / all

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={'good'} counter={good}/>
          <StatisticLine text={'neutral'} counter={neutral}/>
          <StatisticLine text={'bad'} counter={bad}/>
          <StatisticLine text={'all'} counter={all}/>
          <StatisticLine text={'average'} counter={average}/>
          <StatisticLine text={'positive'} counter={positive + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      
      <h1>statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App