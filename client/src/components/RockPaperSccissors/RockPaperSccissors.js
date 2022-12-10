import React, { useState } from 'react';

const RockPaperScissors = () => {
  const [choice, setChoice] = useState(null);

  const determineWinner = (playerChoice, computerChoice) => {
    // Determine the winner based on the player and computer choices
    // Return "player", "computer", or "tie"

  };

  const getComputerChoice = () => { return '' }

  return (
    <div>
      <button onClick={() => setChoice('rock')}>Rock</button>
      <button onClick={() => setChoice('paper')}>Paper</button>
      <button onClick={() => setChoice('scissors')}>Scissors</button>

      <p>You chose: {choice}</p>
      <p>Computer chose: {getComputerChoice()}</p>
      <p>Winner: {determineWinner(choice, getComputerChoice())}</p>

    </div>
  );
};

export default RockPaperScissors;
