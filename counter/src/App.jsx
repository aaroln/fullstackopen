import { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0);
  console.log('rendering with counter value', counter);

  const setToCount = (newCount) => () => {
    setCounter(newCount);
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button 
        onClick={setToCount(counter + 1)} 
        text="plus"/>
      <Button 
        onClick={setToCount(counter - 1)} 
        text="minus"/>
      <Button 
        onClick={setToCount(0)} 
        text="zero"/>
    </div>
  )
}

export default App


