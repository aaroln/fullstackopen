import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const numAnecdotes = anecdotes.length;

  const [votes, setVotes] = useState(new Array(numAnecdotes).fill(0));
   
  const [selected, setSelected] = useState(0);

  const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

  const changeSelected = () => setSelected(Math.floor(Math.random() * numAnecdotes));

  const Title = ({ text }) => <h1>{text}</h1>

  const Votes = ({ num }) =>  <p>has {num} votes</p>

  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const mostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Title text="Anecdote of the day"/>
      {anecdotes[selected]}
      <Votes num={votes[selected]} />
      <div>
        <Button text="vote" onClick={addVote}/>
        <Button text="next anecdote" onClick={changeSelected}/>
      </div>
      <Title text="Anecdote with the most votes"/>
      {anecdotes[mostVotes]}
      <Votes num={votes[mostVotes]} />
    </div>
  )
}

export default App;


