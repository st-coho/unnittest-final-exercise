import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import appReducer from '@app/app.reducers';
import '@testing-library/jest-dom/extend-expect';
import { applyMiddleware, createStore } from 'redux';
import UserInfo from './UserInfo';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import appMiddleware from '@app/app.middleware';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        id: 1,
        'name': 'Leanne Graham',
        'username': 'Bret',
        'email': 'Sincere@april.biz',
        'address': {
          'street': 'Kulas Light',
          'suite': 'Apt. 556',
          'city': 'Gwenborough',
          'zipcode': '92998-3874',
          'geo': {
            'lat': '-37.3159',
            'lng': '81.1496'
          }
        },
        'phone': '1-770-736-8031 x56442',
        'website': 'hildegard.org',
        'company': {
          'name': 'Romaguera-Crona',
          'catchPhrase': 'Multi-layered client-server neural-net',
          'bs': 'harness real-time e-markets'
        }
      })
    );
  })
);
const middleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(middleware, logger));

const ReduxWrapper = ({ children }) => {
  middleware.run(appMiddleware);
  return <Provider store={store}>
        <MemoryRouter>
            <Routes>
              <Route path="*" element={children} />
            </Routes>
          </MemoryRouter>
        </Provider>;
};

describe('test user info screen', () => {

  beforeAll(() => {
    server.listen();
  });
  afterAll(() => {
    server.close();
  });

  describe('test call api success ', () => {
    test('Render user info', async () => {
      render(<UserInfo/>, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('page-loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByTestId('page-loading')).toBeNull();
      });
      expect(screen.getByTestId('user-info')).toBeInTheDocument();
    });
  });
  
  describe('test call api error', () => {
    test('render Error screen', async () => {
      server.use(
        rest.get('https://jsonplaceholder.typicode.com/users/:id', (req, res, ctx) => {
          return res(
            ctx.status(500),
          );
        })
      );
      render(<UserInfo/>, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('page-loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByTestId('page-loading')).toBeNull();
      });
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

});
