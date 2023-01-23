import Button from "react-bootstrap/esm/Button";

const BestOfTheMatch = ({ data, isPlayer1, onClickHandlerReset, player1, player2 }) => {
  const victories = data.victories;
  const resetMatch = () => {
    let resetOption = null
    if (isPlayer1) {
      resetOption = <Button variant="outline-dark" onClick={() => onClickHandlerReset()}>Reset game!</Button>
    } else {
      resetOption = <>You might another opportunity to beat your opponent! <span className='loading'>Wait if {player1} reset the match</span></>
    }
    return resetOption;
  }
  let bestPlayer
  if (victories) {
    bestPlayer = victories[player1] > victories[player2] ? player1 : victories[player1] < victories[player2] ? player2 : 'Tie!'
  }

  return (
    <>
      <p><b>The best player</b> of the match is: {bestPlayer}! {resetMatch()}</p>
    </>
  )
}

export default BestOfTheMatch;