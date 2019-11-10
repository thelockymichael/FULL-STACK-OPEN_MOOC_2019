import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => {
  return (
    <>
      <button onClick={props.onHandleClick}>{props.text}</button>
    </>
  );
};

const Statistic = props => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td> {props.value}</td>
      </tr>
    </>
  );
};

const Statistics = props => {
  if (props.all !== 0) {
    return (
      <>
        <table>
          <thead>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={props.all} />
            <Statistic text="average" value={props.average} />
            <Statistic text="positive" value={props.positive} />
          </thead>
        </table>
      </>
    );
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
};

const App = () => {
  const [good, setGood] = useState({
    count: 0,
    value: 1
  });
  const [neutral, setNeutral] = useState({
    count: 0,
    value: 0
  });
  const [bad, setBad] = useState({
    count: 0,
    value: -1
  });

  const getSum = () => {
    return good.count + neutral.count + bad.count;
  };

  const getAverage = () => {
    return (
      (good.value * good.count +
        neutral.value * neutral.count +
        bad.value * bad.count) /
      (good.count + neutral.count + bad.count)
    );
  };

  const getPositive = () => {
    return `${good.count / (good.count + neutral.count + bad.count)} %`;
  };

  const giveGoodFeedback = () => () =>
    setGood({ ...good, count: good.count + 1 });

  const giveNeutralFeedback = () => () =>
    setNeutral({ ...neutral, count: neutral.count + 1 });

  const giveBadFeedback = () => () => setBad({ ...bad, count: bad.count + 1 });

  return (
    <>
      <h1>give feedback</h1>
      <Button onHandleClick={giveGoodFeedback()} text="good" />
      <Button onHandleClick={giveNeutralFeedback()} text="neutral" />
      <Button onHandleClick={giveBadFeedback()} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good.count}
        neutral={neutral.count}
        bad={bad.count}
        all={getSum()}
        average={getAverage()}
        positive={getPositive()}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
