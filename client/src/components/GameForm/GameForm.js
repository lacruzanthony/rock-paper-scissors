import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

const GameForm = ({ handleSubmit, setSend, setChannel }) => {
  const { matchId } = useParams()

  const TEXT_BUTTON = matchId ? 'Join to match' : 'Create match'

  return (
    <Form className="w-25" onSubmit={handleSubmit}>
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
      {!matchId && (
        <Form.Group controlId="formRounds">
          <Form.Label id="rounds">Rounds</Form.Label>
          <Form.Control
            placeholder='0'
            name="rounds"
            htmlFor="rounds"
            type="number"
          />
        </Form.Group>
      )}
      <Form.Group className="mb-4" controlId="formMatchID">
        <Form.Label id="matchId">Game ID</Form.Label>
        <Form.Control
          placeholder='141.12'
          name="matchId"
          htmlFor="matchId"
          type="text"
          value={matchId ?? undefined}
          disabled={matchId ?? false}
          onChange={(event) => setChannel(event.target.value)}
        />
      </Form.Group>
      <input type='hidden' id="join-game" name="joinGame" value={matchId ? true : false} />
      <Button variant={matchId ? 'success' : 'primary'} type="submit" >{TEXT_BUTTON}</Button>
    </Form >
  )
}


export default GameForm;