import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const GameForm = ({ handleSubmit, setSend, setChannel }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formEmail">
      <Form.Label id="nickname">Nickname</Form.Label>
      <Form.Control htmlFor="nickname" type="text" placeholder='Snake' />
    </Form.Group>
    <Form.Group controlId="formGameID">
      <Form.Label id="gameid">Game ID</Form.Label>
      <Form.Control
        placeholder='141.12'
        name="game-id"
        htmlFor="gameid"
        type="text"
        onChange={(e) => setChannel(e.target.value)}
      />
    </Form.Group>
    {/* <textarea
      rows="5"
      cols="60"
      name="description"
      onChange={(e) => setSend(e.target.value)}
    >
      Enter valid JSON here... (use quotes for keys and values)
    </textarea> */}
    <br />
    <Button variant="primary" type="submit">Create Match</Button>
  </Form>
)


export default GameForm;