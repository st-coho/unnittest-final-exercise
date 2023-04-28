import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import appMiddleware from '@app/app.middleware';
import appReducer from '@app/app.reducers';
import UserList from './UserList';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json([
      {
      'id': 1,
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
    },
    {
      'id': 2,
      'name': 'Chelsey Dietrich',
      'username': 'Kamren',
      'email': 'Lucio_Hettinger@annie.ca',
      'address': {
      'street': 'Skiles Walks',
      'suite': 'Suite 351',
      'city': 'Roscoeview',
      'zipcode': '33263',
      'geo': {
      'lat': '-31.8129',
      'lng': '62.5342'
      }
      },
      'phone': '(254)954-1289',
      'website': 'demarco.info',
      'company': {
      'name': 'Keebler LLC',
      'catchPhrase': 'User-centric fault-tolerant solution',
      'bs': 'revolutionize end-to-end systems'
      }
      },
  ]));
  }),
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

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('test user list component', () => {
  describe('test call api success ', () => {
    test('render list user screen ', async () => {
      render(<UserList />, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('page-loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByTestId('page-loading')).toBeNull();
      });
      expect(screen.getAllByTestId('user-item')).toHaveLength(2);
    });

    test('test user interaction', async () => {
      render(<UserList />, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('page-loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByTestId('page-loading')).toBeNull();
      });
      fireEvent.click(screen.getByTestId('btn-delete-1'));
      expect(screen.queryByTestId('btn-delete-1')).not.toBeInTheDocument();
      const anchorElement = screen.getByTestId('id-2');
      expect(anchorElement).toBeInTheDocument();
      expect(anchorElement).toHaveAttribute('href', '/user-info/2');
    });
  });

  describe('test call api error', () => {
    test('User list render Error', async () => {
      server.use(
        rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
          return res(
            ctx.status(500),
          );
        })
      );
      render(<UserList />, { wrapper: ReduxWrapper });
      expect(screen.getByTestId('page-loading')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByTestId('page-loading')).toBeNull();
      });
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});
