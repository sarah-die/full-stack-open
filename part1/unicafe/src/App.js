import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <>
      {text !== "positive" ? (
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      ) : (
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      )}
    </>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={total} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const calcPositive = (curGood, curTotal) => {
    const pos = (curGood / curTotal) * 100;
    setPositive(pos);
  };

  const calcAverage = (curGood, curBad, curTotal) => {
    const ave = (curGood * 1 + curBad * -1) / curTotal;
    setAverage(ave);
  };

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedTotal = updatedGood + neutral + bad;
    setTotal(updatedTotal);
    calcPositive(updatedGood, updatedTotal);
    calcAverage(updatedGood, bad, updatedTotal);
  };
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedTotal = good + updatedNeutral + bad;
    setTotal(updatedTotal);
    calcPositive(good, updatedTotal);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedTotal = good + neutral + updatedBad;
    setTotal(updatedTotal);
    calcPositive(good, updatedTotal);
    calcAverage(good, updatedBad, updatedTotal);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h2>Statistics</h2>
      {total === 0 ? (
        <div>No feedback given </div>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
