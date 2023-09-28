import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditMajorForm() {
  const [getName, setName] = useState('');
  const [getCategory, setGetCategory] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSubjectsById = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-hmwl9.ondigitalocean.app/majors/${id}`,
        );
        console.log();
        setName(response.data[0].name);
        setGetCategory(response.data[0].category);
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
    setGetCategory(e.target.value);
  };

  const onSubmitSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://monkfish-app-hmwl9.ondigitalocean.app/majors/${id}`,
        {
          name: getName,
          category: getCategory,
        },
      );
      navigate('/majors');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Major</h1>
      <h2 className="subtitle">Edit New Major</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitSubject} action="" method="post">
              <p className="has-text-center">{msg}</p>
              <div className="field">
                <label className="label">Major Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={getName}
                    onChange={onChangeName}
                    className="input"
                    placeholder="Major"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={onChangeCategory} value={getCategory}>
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
}

export default EditMajorForm;
