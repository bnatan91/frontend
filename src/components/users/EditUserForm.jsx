import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config/config';

const AddEditForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [roles, setRoles] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${id}`);
        setName(response.data.name);
        setUsername(response.data.username);
        setRoles(response.data.roles);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfPassword = (e) => {
    setConfPassword(e.target.value);
  };
  const onChangeRoles = (e) => {
    setRoles(e.target.value);
  };

  const onSubmitUpdateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`${API_URL}/api/users/${id}`, {
        name: name,
        username: username,
        password: password,
        confPassword: confPassword,
        roles: roles,
      });
      navigate('/users');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Edit Users</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitUpdateUser} action="" method="post">
              <p className="has-text-center">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={name}
                    onChange={onChangeName}
                    className="input"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    type="text"
                    value={username}
                    onChange={onChangeUsername}
                    className="input"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    className="input"
                    placeholder="*******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    value={confPassword}
                    onChange={onChangeConfPassword}
                    className="input"
                    placeholder="*******"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={onChangeRoles} value={roles}>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field mt-5">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditForm;
