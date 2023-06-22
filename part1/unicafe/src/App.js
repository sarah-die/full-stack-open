import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const Feedback = ({ text, amount }) => {
  return (
    <>
      {text !== "positive" ? (
        <div>
          {text}: {amount}
        </div>
      ) : (
        <div>
          {text}: {amount} %
        </div>
      )}
    </>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <Feedback text={"good"} amount={good} />
      <Feedback text={"neutral"} amount={neutral} />
      <Feedback text={"bad"} amount={bad} />
      <Feedback text={"all"} amount={total} />
      <Feedback text={"average"} amount={average} />
      <Feedback text={"positive"} amount={positive} />
    </div>
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
