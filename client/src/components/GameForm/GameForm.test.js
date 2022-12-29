import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter, Router, Route } from 'react-router-dom'
import GameForm from './index'
import routesConfig from '../../routesConfig'

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    matchId: '1'
  })
}));

describe("Game Form", () => {
  const renderWithRouter = (component) => {
    const history = createMemoryRouter(routesConfig, {
      initialEntries: ["/match/1/player1/juan/rounds/1"],
    });
    const Wrapper = ({ children }) => (
      <Router history={history}>
        <Route path="/match/:matchId/player1/:player1/rounds/:rounds">{children}</Route>
      </Router>
    );
    return {
      ...render(component, { wrapper: Wrapper }),
      history,
    };
  };
  it("should render the Game Form", () => {
    render(<GameForm />)

    expect(screen.getByText(/Nickname/i)).toBeInTheDocument()
    expect(screen.getByText(/Rounds/i)).toBeInTheDocument()
    expect(screen.getByText(/Game ID/i)).toBeInTheDocument()
    expect(screen.getByText(/Create match/i)).toBeInTheDocument()
  })
  it("should render the Game Form", () => {

    const { debug } = render(<GameForm />)

  })
})