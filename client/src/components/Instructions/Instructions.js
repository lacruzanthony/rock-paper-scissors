import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import React from 'react';

const Instructions = () => {
  const { matchId } = useParams();
  const [show, setShow] = React.useState(true)

  return (
    <>
      <Alert show={show} variant="light">
        <Alert.Heading>Lets play!</Alert.Heading>
        <p>
          <ul>
            <li>
              <b>Nickname:</b> this is the name that you will use against your opponent.
            </li>
            {
              !matchId && (
                <>
                  <li>
                    <b>Rounds:</b> the amount of opportunites your opponent and you will have to play.
                  </li>
                  <li>
                    <b>Game ID:</b> this identifies the room where your opponent and you will play the match, it could be any name you want!
                  </li>
                  <p>After you create the match, you will see an URL that you need to share with your opponent</p>
                </>
              )
            }
          </ul>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Got it, lets play!
          </Button>
        </div>
      </Alert>
      {!show && <Button variant='light' onClick={() => setShow(true)}>Show instructions</Button>}
    </>
  )

}

export default Instructions