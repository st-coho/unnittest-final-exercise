import React, { useEffect, useState } from 'react';
import { deleteUser, getListUser } from '../home.action';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const dataList = useSelector((state: RootStateOrAny) => state.homeReducer.dataList);
  const { isLoading, error } = useSelector((state: RootStateOrAny) => state.homeReducer);
  const deleteUserItem = (id: string) => {
    dispatch(deleteUser(id));
  };

  useEffect (() => {
    dispatch(getListUser());
  }, []);

  if (isLoading) {
    return <div data-testid='page-loading'>Loading</div>;
  }

  if(error) {
    return <div data-testid='error'>Error</div>;
  }

  return (
    <>
      <div className="">User List</div>
      <ul data-testid="user-list" className="user-list">
        {
          dataList && dataList.map((item) => (
            <li data-testid="user-item" className="user-item" key={item.id}>
              <Link to ={`/user-info/${item.id}`} data-testid={`id-${item.id}`} className='user-name'>{item?.name} </Link>
              <p>{item.name}</p>
              <button data-testid={`btn-delete-${item.id}`} onClick={() => deleteUserItem(item?.id)}>Delete</button>
            </li>
          ))
        }
      </ul>
    </>
  );
};
export default Home;
