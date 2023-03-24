import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameList } from '../../../../../src/components/games/gameList';
import { IsDarkContext } from '../../../../../src/context/context';
import { act } from 'react-test-renderer';

describe('GameList', () => {
  const games = [
    {
      id: 1,
      name: 'Game 1',
      category: 'Category 1',
      creation: '2022/03/21',
      ranges: 10,
      status: 'active'
    },
    {
      id: 2,
      name: 'Game 2',
      category: 'Category 2',
      creation: '2022/03/20',
      ranges: 20,
      status: 'inactive'
    }
  ];
  const setIsOpen = jest.fn();

  it('should render GameList component correctly', () => {
    render(
      <IsDarkContext.Provider value={{ isDark: true }}>
        <GameList games={games} setIsOpen={setIsOpen} />
      </IsDarkContext.Provider>
    );
    const gameListElement = screen.getByTestId('game-list');
    expect(gameListElement).toBeInTheDocument();
  });

  it('should sort the games by category', () => {
    render(
      <IsDarkContext.Provider value={{ isDark: true }}>
        <GameList games={games} setIsOpen={setIsOpen} />
      </IsDarkContext.Provider>
    );
    
    const gameList = screen.getByTestId('game-list');
    expect(gameList).toBeInTheDocument();
    
    const sortCategory = screen.getByTestId('category');

      userEvent.click(sortCategory);
      const categoryCells = screen.getAllByRole('cell', { name: /Category/ });
      expect(categoryCells[0].textContent).toEqual('Category 1');

  });
  
  it('should filter the games by search', () => {
    const setIsOpen = jest.fn();
    const { getByTestId } = render(
      <IsDarkContext.Provider value={{ isDark: true }}>
        <GameList games={games} setIsOpen={setIsOpen} />
      </IsDarkContext.Provider>
    );
  
    act(() => {
      const searchInput = screen.getByTestId('search');
      userEvent.type(searchInput, 'Game 1');
    });
  
    const nameCell = screen.getByRole('cell', { name: 'Game 1' });
    expect(nameCell).toBeInTheDocument();
  });
  
  
});
