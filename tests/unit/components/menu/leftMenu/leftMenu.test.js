import React from 'react';
import { render, screen} from '@testing-library/react';
import { ActiveMenuContext, IsDarkContext } from '../../../../../src/context/context';
import { LeftMenu } from '../../../../../src/components/menu/leftMenu/';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';

describe('LeftMenu', () => {
  test('should render without errors', () => {
    render(
      <ActiveMenuContext.Provider value={{ activeMenu: false }}>
        <IsDarkContext.Provider value={{ isDark: true }}>
          <Router>
            <LeftMenu />
          </Router>
        </IsDarkContext.Provider>
      </ActiveMenuContext.Provider>
    );
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders dashboard icon', () => {
    render(
      <MemoryRouter>
        <ActiveMenuContext.Provider value={{ activeMenu: false }}>
          <IsDarkContext.Provider value={{ isDark: true }}>
            <LeftMenu />
          </IsDarkContext.Provider>
        </ActiveMenuContext.Provider>
      </MemoryRouter>
    );
    const dashboardIcon = screen.getByAltText('dashboard');
    expect(dashboardIcon).toBeInTheDocument();
    const dashboardLabel = screen.getByText('Dashboard');
    expect(dashboardLabel).toBeInTheDocument();
  });
  

  test('renders closeButton', () => {
    render(
      <MemoryRouter>
        <ActiveMenuContext.Provider value={{ activeMenu: false }}>
          <IsDarkContext.Provider value={{ isDark: false }}>
            <LeftMenu />
          </IsDarkContext.Provider>
        </ActiveMenuContext.Provider>
      </MemoryRouter>
    );
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveTextContent('X');
  });
});