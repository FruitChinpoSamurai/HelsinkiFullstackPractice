import { useState } from 'react';

const Header = ({title}) => <h1>{title}</h1>

const Button = ({text, value, handleClick}) => <button onClick={() => handleClick(value + 1)}>{text}</button>

const FeedbackButtons = ({goodText, neutralText, badText, good, neutral, bad, handleGood, handleNeutral, handleBad}) => {
  return (
    <div>
      <Button text={goodText} value={good} handleClick={handleGood} />
      <Button text={neutralText} value={neutral} handleClick={handleNeutral} />
      <Button text={badText} value={bad} handleClick={handleBad} />
    </div>
  )
}

const StatisticLine = ({text, value, percent}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{percent}</td>
    </tr>
  )
}

const Statistics = ({title, goodValue, neutralValue, badValue}) => {
  const all = goodValue + neutralValue + badValue;
  const average = (goodValue - badValue) / all;
  const percentPositive = (goodValue / all) * 100;
  
  if (goodValue === 0 && neutralValue === 0 && badValue === 0) {
    return (
      <div>
        <h1>{title}</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>{title}</h1>
        <table>
          <StatisticLine text='good' value={goodValue} />
          <StatisticLine text='neutral' value={neutralValue} />
          <StatisticLine text='bad' value={badValue} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={percentPositive} percent="%" />
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title='give feedback' />
      <FeedbackButtons
        goodText='good' neutralText='neutral' badText='bad'
        good={good} neutral={neutral} bad={bad}
        handleGood={setGood} handleNeutral={setNeutral} handleBad={setBad}
      />
      <Statistics 
        title='statistics'
        goodValue={good} neutralValue={neutral} badValue={bad}
      />
    </div>
  )
}

export default App;
