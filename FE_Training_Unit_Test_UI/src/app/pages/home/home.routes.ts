import React from 'react';

import { PageRoute } from '@core/modules/custom-router-dom/router.interface';

const UserList = React.lazy(() => import('./containers/UserList'));
const UserInfo = React.lazy(() => import('./containers/UserInfo'));

const homeRoutes: PageRoute[] = [
  {
    path: '/',
    element: UserList
  },
  {
    path: '/user-info/:id',
    element: UserInfo
  }
];

export default homeRoutes;
