import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config/config';

const EditStudentForm = () => {
  const [getCode, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getStudentById = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students/${id}`);
        setCode(response.data[0].studentCode);
      } catch (error) {
        if (error.message) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getStudentById();
  }, [id]);

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onClickBackButton = () => {
    navigate('/students');
  };

  const onSubmitStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/api/students/${id}`, {
        studentCode: getCode,
      });
      navigate('/students');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Student</h1>
      <h2 className="subtitle">Edit New Student</h2>
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
                    value={getCode}
                    onChange={onChangeCode}
                    className="input"
                    placeholder="StudentCode"
                  />
                </div>
              </div>
              <div className="field mt-5">
                <div className="control">
                  <button
                    type="button"
                    onClick={onClickBackButton}
                    className="button is-success"
                  >
                    Back
                  </button>
                  <button type="submit" className="button is-success ml-1">
                    Update
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

export default EditStudentForm;
