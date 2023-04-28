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
      <div className="card">
        <div className="card-header">
          <h2>User List</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>User Name</td>
                <td>Phone</td>
                <td>Website</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody data-testid="user-list">
              {
                dataList && dataList.map((item) => (
                  <tr data-testid="user-item" key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.phone}</td>
                    <td>{item.website}</td>
                    <td>
                      <Link to ={`/user-info/${item.id}`} data-testid={`id-${item.id}`} className='user-name'>Detail</Link>
                      <button data-testid={`btn-delete-${item.id}`} onClick={() => deleteUserItem(item?.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Home;
