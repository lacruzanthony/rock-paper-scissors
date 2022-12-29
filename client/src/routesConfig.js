import Lobby from "./components/Lobby";
import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import Match from "./components/Match";
import GameForm from "./components/GameForm";
import RockPaperSccissors from "./components/RockPaperSccissors";

const routesConfig = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Lobby />,
      },
      {
        path: "match/:matchId/player1/:player1/rounds/:rounds",
        element: <Lobby />,
      },
      {
        path: "matching/player1/:player1/player2/:player2/secondPlayerJoined/:secondPlayerJoined",
        element: <Match />,
      },
      {
        path: "playing/player1/:player1/player2/:player2/rounds/:rounds/match/:matchId/isFromPlayer1/:isFromPlayer1",
        element: <RockPaperSccissors />
      },
      {
        path: "playing/player1/:player1/player2/:player2/rounds/:rounds/match/:matchId/",
        element: <RockPaperSccissors />
      }
    ]
  },
  {
    path: "match/:matchId/player1/:player1/rounds/:rounds",
    element: <Lobby />,
  },
];

export default routesConfig;