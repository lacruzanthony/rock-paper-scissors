import BestOfTheMatch from "./BestOfTheMatch"
import { render, screen, fireEvent } from '@testing-library/react'

const props = {
  data: {
    victories: { "p1": 1, "p2": 2 }
  },
  isPlayer1: true,
  onClickHandlerReset: jest.fn(),
  player1: "p1",
  player2: "p2"
}

describe('<BestOfTheMatch />', () => {
  it('should show p2 as the best player', () => {
    render(<BestOfTheMatch {...props} />)
    expect(screen.getByText(/p2/i)).toBeInTheDocument();
  });
  it('should show p1 as the best player', () => {
    const data = {
      ...props,
      data: { victories: { "p1": 3, "p2": 2 } }
    }
    render(<BestOfTheMatch {...data} />)
    expect(screen.getByText(/p1/i)).toBeInTheDocument()
  })

  it('should show Reset Game button if it is player 1', () => {
    render(<BestOfTheMatch {...props} />)

    expect(screen.getByText(/reset game/i)).toBeInTheDocument()
  })
})