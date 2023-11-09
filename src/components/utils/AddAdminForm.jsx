import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AddAdmin() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [roles, setRoles] = useState('admin');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

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

  const onSubmitAddUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/test/users', {
        name: name,
        username: username,
        password: password,
        confPassword: confPassword,
        roles: roles,
      });
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New Users</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitAddUser} action="" method="post">
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
                <label className="label">username</label>
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
}

export default AddAdmin;
