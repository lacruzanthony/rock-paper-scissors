import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import ErrorPage from './index'
import routesConfig from "../../routesConfig"

describe("Error page", () => {
  it("should render the Error Page", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });

    render(
      <RouterProvider router={router}>
        <ErrorPage />
      </RouterProvider>
    )
    expect(screen.getByText(/Sorry, an unexpected error has occurred./i)).toBeInTheDocument()
  })
})