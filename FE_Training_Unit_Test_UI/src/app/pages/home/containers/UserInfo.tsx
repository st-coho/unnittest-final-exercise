import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getUserInfo } from '../home.action';

const UserInfo = (): JSX.Element => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { dataUser } = useSelector((state: RootStateOrAny) => state.homeReducer);
  const { error, isLoading } = useSelector((state: RootStateOrAny) => state.homeReducer);

  useEffect (() => {
    dispatch(getUserInfo(id));
  }, [id]);

  if (isLoading) {
    return <div data-testid="page-loading">Loading</div>;
  }

  if(error) {
    return <div data-testid='error'>Error</div>;
  }

  return (
    <div style={{margin: "50px auto 0", width: '400px'}}>
      <h1 style={{paddingBottom: "50px", fontSize: '50px', fontWeight: '900'}}>User Detail page</h1>
      {
        dataUser &&
          <div data-testid="user-info">
            <p><span style={{fontWeight: "700"}}>Name:</span> {dataUser.name} </p>
            <p><span style={{fontWeight: "700"}}>Phone:</span> {dataUser.phone} </p>
            <p><span style={{fontWeight: "700"}}>Website:</span> {dataUser.website} </p>
            <p><span style={{fontWeight: "700"}}>UserName:</span> {dataUser.username} </p>
            <p><span style={{fontWeight: "700"}}>Address:</span> {dataUser.address.suite + '' + dataUser.address.street + '' + dataUser.address.city} </p>
          </div>
      }
    </div>
  );
};

export default UserInfo;
