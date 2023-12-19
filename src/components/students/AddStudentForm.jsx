import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/config';

const AddStudentForm = () => {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmitStudent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/students`, {
        studentCode: code,
      });
      navigate('/students');
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <>
      <h1 className="title">Students</h1>
      <h2 className="subtitle">Add New Students</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitStudent} action="" method="post">
              <p className="has-text-center">{msg}</p>
              <div className="field">
                <label className="label">Student Code</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={code}
                    onChange={onChangeCode}
                    placeholder="StudentCode"
                  />
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

export default AddStudentForm;
