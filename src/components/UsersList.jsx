import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`/api/users/${userId}`);
  };

  const onClickDelete = (userId) => {
    deleteUser(userId);
    getUsers();
  };

  return (
    <>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List Of Users</h2>
      <Link to={'./add'} className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>
                <Link
                  to={`./edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  edit
                </Link>
                <button
                  onClick={() => onClickDelete(user.uuid)}
                  className="button is-small is-danger ml-1"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
