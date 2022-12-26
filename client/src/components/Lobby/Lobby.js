import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as subscriptions from "../../graphql/subscriptions"; //codegen generated code
import * as mutations from "../../graphql/mutations"; //codegen generated code
import * as queries from "../../graphql/queries"; //codegen generated code
import Alert from 'react-bootstrap/Alert';

import Match from "../Match"
import GameForm from "../GameForm";
import RockPaperSccissors from '../RockPaperSccissors';
import { getCurrentURL, hasParam, getURLParam } from '../../utils';

//AppSync endpoint settings
const myAppConfig = {
  "aws_appsync_graphqlEndpoint": "https://2dh4qsc66bgkle7lp2epzugrtq.appsync-api.us-east-1.amazonaws.com/graphql",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "da2-qey557o6a5fkvlnhnqv6nq3wsm	",
};

Amplify.configure(myAppConfig);

const Lobby = () => {
  const [send, setSend] = useState("");
  const [channel, setChannel] = useState("");
  const [received, setReceived] = useState("");
  const [matchURL, setMatchURL] = useState("");
  const [startGame, setStartGame] = useState(false);

  const { player1, rounds, matchId } = useParams()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const matchId = event.target.matchId.value;
    const player = event.target.nickname.value;
    const roundsForm = event.target.rounds?.value;
    const isJoiningGame = event.target.joinGame?.value;

    let data = { player, rounds }
    if (isJoiningGame === 'true') {
      data = {
        player1: player1,
        player2: player,
        rounds: rounds,
        secondPlayerJoined: true
      }
    } else {
      const matchURL = `${getCurrentURL()}match/${matchId}/player1/${player}/rounds/${roundsForm}`;
      setMatchURL(matchURL)
    }
    await API.graphql(
      graphqlOperation(mutations.publish2channel, { name: matchId, data: JSON.stringify(data) })
    );
    setSend(data)
  }

  useEffect(() => {
    if (matchId) {
      setChannel(matchId)
    }
  }, [])

  useEffect(async () => {
    if (startGame) {
      await API.graphql(
        graphqlOperation(mutations.publish2channel, { name: channel, data: JSON.stringify({ ...data, readyToPlay: true }) })
      );
      debugger;
      navigate(`/playing/player1/${data.player1}/player2/${data.player2}/rounds/${data.rounds}/match/${channel}/isFromPlayer1/1`,)
    }
  }, [startGame])

  useEffect(() => {
    //Subscribe via WebSockets
    const subscription = API.graphql(
      graphqlOperation(subscriptions.subscribe2channel, { name: channel })
    ).subscribe({
      next: ({ provider, value }) => {
        debugger;
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

  if (data.readyToPlay) {
    navigate(`/playing/player1/${data.player1}/player2/${data.player2}/rounds/${data.rounds}/match/${matchId}`,)
  }

  if (!startGame && data.secondPlayerJoined) {
    debugger;
    return (
      <Match
        setStartGame={setStartGame}
        player1={data.player1}
        player2={data.player2}
        secondPlayerJoined={data.secondPlayerJoined}
      />
    )
  }


  return (
    <>
      {!startGame && matchURL && (
        <Alert variant="success">
          <Alert.Heading>Match created successfully</Alert.Heading>
          <Alert.Link href={matchURL}>{matchURL}</Alert.Link>
        </Alert>
      )}
      {!data.secondPlayerJoined && !startGame && (
        <GameForm
          setChannel={setChannel}
          handleSubmit={handleSubmit}
          setSend={setSend}
        />)}
      <p>Subscribed/Listening to channel "{channel}"...</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default Lobby