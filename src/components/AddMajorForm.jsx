import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMajorForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onSubmitMajorHandler = async (e) => {
    e.preventDefault(e);
    try {
      await axios.post('https://monkfish-app-hmwl9.ondigitalocean.app/majors', {
        name: name,
        category: category,
      });
      navigate('/majors');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Majors</h1>
      <h2 className="subtitle">Add New Majors</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitMajorHandler} action="" method="post">
              <p className="has-text-center">{msg}</p>
              <div className="field">
                <label className="label">Major Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={onChangeName}
                    placeholder="Major"
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
                      <option value="BAHASA">BAHASA</option>
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

export default AddMajorForm;
