import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../../graphql/subscriptions"; //codegen generated code
import * as mutations from "../../graphql/mutations"; //codegen generated code
import * as queries from "../../graphql/queries"; //codegen generated code
import Alert from 'react-bootstrap/Alert';

import GameForm from "../GameForm";
import RockPaperSccissors from '../RockPaperSccissors';
import { getCurrentURL, hasParam, getURLParam } from '../../utils';

//AppSync endpoint settings
const myAppConfig = {
  "aws_appsync_graphqlEndpoint": "https://2dh4qsc66bgkle7lp2epzugrtq.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-vfeoxc7gevebvjn2qxhyoipq2i",
};

Amplify.configure(myAppConfig);

const Match = () => {
  const [send, setSend] = useState("");
  const [channel, setChannel] = useState("");
  const [received, setReceived] = useState("");
  const [matchURL, setMatchURL] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const matchId = event.target.gameid.value;
    const player = event.target.nickname.value;
    const rounds = event.target.rounds?.value;
    const isJoiningGame = event.target.joinGame?.value;

    let data = { player, rounds }

    if (isJoiningGame === 'true') {
      data = {
        player1: getURLParam('player'),
        player2: player,
        rounds: getURLParam('rounds')
      }
    } else {
      const matchURL = `${getCurrentURL()}?match=${matchId}&player=${player}&rounds=${rounds}`;
      setMatchURL(matchURL)
    }

    const publish = await API.graphql(
      graphqlOperation(mutations.publish2channel, { name: matchId, data: JSON.stringify(data) })
    );
    // setSend("Enter valid JSON here... (use quotes for keys and values)");
  }

  useEffect(async () => {
    const matchId = getURLParam('match')
    if (matchId) {
      setChannel(matchId)
    }
  }, [])

  useEffect(() => {
    //Subscribe via WebSockets
    const subscription = API.graphql(
      graphqlOperation(subscriptions.subscribe2channel, { name: channel })
    ).subscribe({
      next: ({ provider, value }) => {
        setReceived(value.data.subscribe2channel.data);
      },
      error: (error) => console.warn(error),
    });
    return () => subscription.unsubscribe();
  }, [channel]);

  let data = ''
  if (received) {
    data = JSON.parse(received);
  }

  let isTimeToPlay = true

  if (false) {
    return (
      <>
        <figure>
          <figcaption>Players</figcaption>
          <ol>
            <li>A</li>
            <li>B</li>
            <li>C</li>
          </ol>
        </figure>
      </>
    )
  }
  return (
    <div>
      {matchURL && (<Alert variant="success">Match created successfully: {matchURL}</Alert>)}
      {/* {!isTimeToPlay && (<GameForm setChannel={setChannel} handleSubmit={handleSubmit} setSend={setSend} />)} */}
      <GameForm
        setChannel={setChannel}
        handleSubmit={handleSubmit}
        setSend={setSend}
      />
      {/* {isTimeToPlay && (<RockPaperSccissors />)} */}
      <p>Subscribed/Listening to channel "{channel}"...</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Match