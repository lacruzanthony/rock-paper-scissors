import ComingSoon from "./ComingSoon"
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('<ComingSoon />', () => {
  it("should show Coming soon page", () => {
    render(<ComingSoon />, { wrapper: BrowserRouter })
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument()
  })

  it("should go to Lobby page", async () => {
    render(<ComingSoon />, { wrapper: BrowserRouter })
    const user = userEvent.setup()
    await user.click(screen.getByText(/go to lobby/i))
    expect(screen.getByText(/lobby/i)).toBeInTheDocument()
  })
})