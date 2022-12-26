import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import './Match.css'

const Match = ({ setStartGame, player1, player2, secondPlayerJoined }) => {
  const isSecondPlayer = !!player2
  const { matchId } = useParams()
  debugger;
  if (secondPlayerJoined && !matchId) {
    return (
      <>
        <p>Player <b>{player2}</b> is ready to play!</p>
        <Button onClick={() => setStartGame(true)}>Start game!</Button>
      </>
    )
  } else if (secondPlayerJoined && isSecondPlayer) {
    return (
      <>
        <p className='loading'>Waits for player <b>{player1}</b> to start the game</p>
      </>
    )
  }

  return null
}

export default Match;