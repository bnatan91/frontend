import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/config';

const UsersList = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`${API_URL}/api/users`);
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`${API_URL}/api/users/${userId}`);
    getUsers();
  };

  const onClickDelete = (userId) => {
    deleteUser(userId);
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
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.roles}</td>
              <td>
                <Link to={`./${user.uuid}`} className="button is-small is-info">
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
