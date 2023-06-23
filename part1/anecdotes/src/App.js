import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))

  const getRandomAnecdote = () => setSelected(randomInteger(0,anecdotes.length))
  
  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotedAnecdote = points.indexOf(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br></br>
      has {points[selected]} votes <br></br>
      
      <Button
        handleClick={addVote}
        text='vote'
      />
      <Button
        handleClick={getRandomAnecdote}
        text='next anecdote'
      />

      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedAnecdote]} <br></br>
      has {points[mostVotedAnecdote]} votes
    </div>
  )
}

export default App