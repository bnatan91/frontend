import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSubjectForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('IPA');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onSubmitSubject = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/subjects', {
        name: name,
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
      <h1 className="title">Students</h1>
      <h2 className="subtitle">Add New Subjects</h2>
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
                    className="input"
                    value={name}
                    onChange={onChangeName}
                    placeholder="Subject"
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

export default AddSubjectForm;
