import { render, screen } from '@testing-library/react';
import App from './App';
import {AppProvider} from "./Context";

describe('game initialization', () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <App/>
      </AppProvider>
    )
  })

  test('renders board ', () => {
    const board = screen.getByTestId('board');
    expect(board).toBeInTheDocument();

    const squares = screen.getAllByRole('cell')
    expect(squares).toHaveLength(100);
  })
  test('renders "Game running" text upon initialization', () => {
    const gameText = screen.getByText('Game running');
    expect(gameText).toBeInTheDocument();
  })

});
