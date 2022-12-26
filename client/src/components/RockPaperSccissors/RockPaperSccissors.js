import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { useParams } from 'react-router-dom';
import * as mutations from "../../graphql/mutations"; //codegen generated code
import * as subscriptions from "../../graphql/subscriptions"; //codegen generated code


const RockPaperScissors = () => {
  const [choice, setChoice] = useState(null);
  const [oponnentChoice, setOpponentChoice] = useState(null);
  const [received, setReceived] = useState();
  const [localRounds, setLocalRounds] = useState(1)
  const [winner, setWinner] = useState();

  const { matchId, isFromPlayer1, player1, player2, rounds } = useParams()

  const currentPlayer = () => isFromPlayer1 ? player1 : player2

  const determineWinner = (yourChoice, opponentChoice) => {
    const choices = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper"
    };

    // Default result.
    let result = 'Invalid choice. Please choose rock, paper, or scissors.'

    if (yourChoice === opponentChoice) {
      result = "It's a tie! (。_。)"
    } else if (choices[yourChoice] === opponentChoice) {
      result = "you win! (⌐■_■)";
    } else if (choices[opponentChoice] === yourChoice) {
      result = "you lose (╯°□°）╯︵ ┻━┻";
    }
    setWinner(`${currentPlayer()}, ${result}`);
  };

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.subscribe2channel, { name: matchId })
    ).subscribe({
      next: ({ provider, value }) => {
        debugger;
        setReceived(value.data.subscribe2channel.data)
        const dataReceived = JSON.parse(value.data.subscribe2channel.data)
        if (dataReceived.player !== currentPlayer()) {
          setOpponentChoice(dataReceived.choice)
        }
      },
      error: (error) => console.warn(error),
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    debugger;
    if (oponnentChoice && choice) {
      determineWinner(choice, oponnentChoice)
      setLocalRounds(prev => prev + 1)
    }
  }, [oponnentChoice, choice])

  const onClickHandler = async (choice) => {
    let data = {
      player: currentPlayer(),
      choice: choice
    }
    await API.graphql(
      graphqlOperation(mutations.publish2channel, { name: matchId, data: JSON.stringify(data) })
    );
    setChoice(choice)
  }

  const RockPaperSccissorsChoice = () => {
    debugger;
    if (localRounds <= parseInt(rounds)) {
      return (
        <>
          <button onClick={() => onClickHandler('rock')}>Rock</button>
          <button onClick={() => onClickHandler('paper')}>Paper</button>
          <button onClick={() => onClickHandler('scissors')}>Scissors</button>
        </>
      )
    }
    return null;
  }

  let data = ''
  if (received) {
    data = JSON.parse(received);
  }

  return (
    <>
      <h3 class="h3">Time to play! Select your move and waits for your oponnet movement.</h3>
      <p><b>Round: {localRounds > rounds ? rounds : localRounds} of {rounds}</b></p>
      <RockPaperSccissorsChoice />
      <p>You chose: {choice}</p>
      <p>Opponent chose: {oponnentChoice && choice ? oponnentChoice : null}</p>
      <p>The result of the round is: {winner}</p>
    </>
  );
};

export default RockPaperScissors;
