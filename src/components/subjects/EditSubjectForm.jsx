import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config/config';

const EditSubjectForm = () => {
  const [getName, setName] = useState('');

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState('IPA');

  useEffect(() => {
    const getSubjectsById = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/subjects/${id}`);
        console.log(response);
        setName(response.data[0].name);
        setCategory(response.data[0].category);
      } catch (error) {
        if (error.message) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSubjectsById();
  }, [id]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onClickBackButton = () => {
    navigate('/subjects');
  };

  const onSubmitSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/api/subjects/${id}`, {
        name: getName,
        category: category,
      });
      navigate('/subjects');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Subjects</h1>
      <h2 className="subtitle">Edit New Subjects</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitSubject} action="" method="post">
              <p className="has-text-center">{msg}</p>
              <div className="field">
                <label className="label">Subject Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={getName}
                    onChange={onChangeName}
                    className="input"
                    // placeholder="Subject"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={onChangeCategory} value={category}>
                      <option value="IPA">IPA</option>
                      <option value="IPS">IPS</option>
                      <option value="BAHASA">Bahasa</option>
                    </select>
                  </div>
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

export default EditSubjectForm;
