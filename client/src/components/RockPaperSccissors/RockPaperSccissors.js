import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { useParams } from 'react-router-dom';
import * as mutations from "../../graphql/mutations"; //codegen generated code
import * as subscriptions from "../../graphql/subscriptions"; //codegen generated code
import './RockPaperSccissors.css'
import BestOfTheMatch from '../BestOfTheMatch';
import Button from 'react-bootstrap/esm/Button';

const RockPaperScissors = () => {
  const [choice, setChoice] = useState(null);
  const [oponnentChoice, setOpponentChoice] = useState(null);
  const [received, setReceived] = useState();
  const [localRounds, setLocalRounds] = useState(1);
  const [result, setResult] = useState();
  const [showBestOfTheMatch, setShowBestOfTheMatch] = useState(false);

  const { matchId, isFromPlayer1, player1, player2, rounds } = useParams()
  const [victories, setVictories] = useState({ [player1]: 0, [player2]: 0 });

  const currentPlayer = () => isFromPlayer1 ? player1 : player2
  const opponentPlayer = () => !isFromPlayer1 ? player1 : player2

  const determineWinner = async (yourChoice, opponentChoice) => {
    const choices = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper"
    };

    // Default result.
    let winner = ''
    let result = 'Invalid choice. Please choose rock, paper, or scissors.'

    if (yourChoice === opponentChoice) {
      result = "It's a tie! (。_。)"
    } else if (choices[yourChoice] === opponentChoice) {
      result = "you win! (⌐■_■)";
      winner = currentPlayer()
      victories[winner]++
    } else if (choices[opponentChoice] === yourChoice) {
      result = "you lose (╯°□°）╯︵ ┻━┻";
      winner = opponentPlayer()
      victories[winner]++
    }
    setResult(`${result}`);
    await API.graphql(
      graphqlOperation(mutations.publish2channel, { name: matchId, data: JSON.stringify({ readyToNextRound: localRounds < parseInt(rounds), winner, victories }) })
    );
  };

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.subscribe2channel, { name: matchId })
    ).subscribe({
      next: ({ provider, value }) => {
        setReceived(value.data.subscribe2channel.data)
        const dataReceived = JSON.parse(value.data.subscribe2channel.data)
        if (dataReceived.winner) {
          setVictories(dataReceived.victories)
        }
        if (dataReceived.goToNextRound && !isFromPlayer1) {
          prepareNextRound()
        }
        if (dataReceived.player && dataReceived.player !== currentPlayer()) {
          setOpponentChoice(dataReceived.choice)
        }

        if (dataReceived.resetMatch) {
          setLocalRounds(1)
          setChoice('')
          setOpponentChoice('')
          setResult('')
          setShowBestOfTheMatch(false)
        }
        // The last round.
        if (dataReceived.readyToNextRound !== undefined && !dataReceived.readyToNextRound) {
          setShowBestOfTheMatch(true)
        }
      },
      error: (error) => console.warn(error),
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (oponnentChoice && choice) {
      determineWinner(choice, oponnentChoice)
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
    if (localRounds <= parseInt(rounds)) {
      return (
        <>
          <h4 className="h4 d-block">Choose one move:</h4>
          <div className='d-flex gap-4 mb-4'>
            <Button variant="outline-dark" disabled={choice} onClick={() => onClickHandler('rock')}>✊ Rock</Button>
            <Button variant="outline-dark" disabled={choice} onClick={() => onClickHandler('paper')}>✋ Paper</Button>
            <Button variant="outline-dark" disabled={choice} onClick={() => onClickHandler('scissors')}> ✌ Scissors</Button>
          </div>
        </>
      )
    }
    return null;
  }

  let data = ''
  if (received) {
    data = JSON.parse(received);
  }

  const prepareNextRound = () => {
    setLocalRounds(prev => prev + 1)
    setChoice('')
    setOpponentChoice('')
    setResult('')
  }

  const nextRound = async () => {
    prepareNextRound()
    await API.graphql(
      graphqlOperation(mutations.publish2channel, { name: matchId, data: JSON.stringify({ goToNextRound: true }) })
    );
  }

  const onClickHandlerReset = async () => {
    await API.graphql(
      graphqlOperation(mutations.publish2channel, { name: matchId, data: JSON.stringify({ resetMatch: true }) })
    );
  }

  return (
    <>
      <h3 className="h3">Hey {currentPlayer()}, time to play! Select your move and waits for your oponnet movement.</h3>
      <p><b>Round: {localRounds > rounds ? rounds : localRounds} of {rounds}</b></p>
      {showBestOfTheMatch ? <BestOfTheMatch data={data} onClickHandlerReset={onClickHandlerReset} isPlayer1={currentPlayer() === player1} player1={player1} player2={player2} /> : <RockPaperSccissorsChoice />}
      <p>Your move: {choice}</p>
      <p>Opponent move: {oponnentChoice && choice ? oponnentChoice : null}</p>
      <p>The result of the round is: {result}</p>
      {result && data.readyToNextRound && isFromPlayer1 && localRounds < parseInt(rounds) && <Button variant="outline-dark" onClick={() => nextRound()}>Next round</Button>}
    </>
  );
};

export default RockPaperScissors;
