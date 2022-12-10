import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getURLParam } from "../../utils";

const GameForm = ({ handleSubmit, setSend, setChannel }) => {
  const gameId = getURLParam('match')

  const TEXT_BUTTON = gameId ? 'Join to match' : 'Create match'

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label id="nickname">Nickname</Form.Label>
        <Form.Control
          placeholder='Snake'
          name="nickname"
          htmlFor="nickname"
          type="text"
          onChange={(e) => setSend(e.target.value)}
        />
      </Form.Group>
      {!gameId && (
        <Form.Group controlId="formRounds">
          <Form.Label id="rounds">Rounds</Form.Label>
          <Form.Control
            placeholder='0'
            name="rounds"
            htmlFor="rounds"
            type="number"
          // onChange={(e) =>setSend(e.target.value)}
          />
        </Form.Group>
      )}
      <Form.Group controlId="formGameID">
        <Form.Label id="gameid">Game ID</Form.Label>
        <Form.Control
          placeholder='141.12'
          name="gameid"
          htmlFor="gameid"
          type="text"
          value={gameId ?? undefined}
          disabled={gameId ?? false}
          onChange={(event) => setChannel(event.target.value)}
        />
      </Form.Group>
      <input type='hidden' id="join-game" name="joinGame" value={gameId ? true : false} />
      <Button variant={gameId ? 'success' : 'primary'} type="submit" >{TEXT_BUTTON}</Button>
    </Form >
  )
}


export default GameForm;