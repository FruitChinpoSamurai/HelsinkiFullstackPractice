import { useState } from 'react'

const HeaderAndFooter = ({title, displayAnecdote}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{displayAnecdote.text}</p>
      <p>has {displayAnecdote.votes} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {   
  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState([
    {text: 'If it hurts, do it more often.', votes: 0},
    {text: 'Adding manpower to a late software project makes it later!', votes: 0},
    {text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text: 'Premature optimization is the root of all evil.', votes: 0},
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
    {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0},
    {text: 'The only way to go fast, is to go well.', votes: 0}
  ]);

  const randomGenerator = () => {
    let randomNumber = 0;
    do {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    } while (randomNumber === selected);
    return randomNumber;
  }

  const updateAnecdotes = () => {
    const updatedAnecdotes = [...anecdotes];
    updatedAnecdotes[selected] = {...updatedAnecdotes[selected], votes: updatedAnecdotes[selected].votes + 1};
    return updatedAnecdotes;
  }

  const mostVotedAnecdote = () => {
    let highest = 0;
    let indexHighest = 0;
    anecdotes.forEach((anecdote, index) => {
      if (anecdote.votes > highest) {
        highest = anecdote.votes;
        indexHighest = index;
      }      
    });
    console.log(highest, indexHighest);
    return indexHighest;
  }

  return (
    <div>
      <HeaderAndFooter title='Anecdote of the day' displayAnecdote={anecdotes[selected]} />
      <Button handleClick={() => setAnecdotes(updateAnecdotes())} text='vote' />
      <Button handleClick={() => setSelected(randomGenerator())} text='next anecdote' />
      <HeaderAndFooter title='Anecdote with most votes' displayAnecdote={anecdotes[mostVotedAnecdote()]} />
    </div>
  )
}

export default App;
