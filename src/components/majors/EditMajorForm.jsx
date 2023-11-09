import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config/config';

const EditMajorForm = () => {
  const [majorLabel, setMajorLabel] = useState(' ');
  const [majorName, setMajorName] = useState(' ');
  const [majorCategory, setMajorCategory] = useState('IPA');
  const [majorDescription, setMajorDescription] = useState(' ');
  const [majorExtraNote, setMajorExtraNote] = useState(' ');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { studentId, id } = useParams();

  useEffect(() => {
    const getSubjectsById = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/majors/${studentId}/${id}`,
        );
        setMajorLabel(response.data.label);
        setMajorName(response.data.name);
        setMajorDescription(response.data.description);
        setMajorExtraNote(response.data.extra_note);
        setMajorCategory(response.data.category);
      } catch (error) {
        console.log(error.message);
        if (error.message) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getSubjectsById();
  }, [studentId, id]);

  const onChangeLabel = (e) => {
    setMajorLabel(e.target.value);
  };
  const onChangeMajorName = (e) => {
    setMajorName(e.target.value);
  };
  const onChangeMajorDescription = (e) => {
    setMajorDescription(e.target.value);
  };
  const onChangeMajorExtraNote = (e) => {
    setMajorExtraNote(e.target.value);
  };
  const onChangeMajorCategory = (e) => {
    setMajorCategory(e.target.value);
  };

  const onClickBackButton = () => {
    navigate(`/majors/${studentId}`);
  };

  const onSubmitSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/api/majors/${studentId}/${id}`, {
        majorLabel: majorLabel,
        majorName: majorName,
        majorCategory: majorCategory,
        majorDescription: majorDescription,
        majorExtraNote: majorExtraNote,
      });
      navigate(`/majors/${studentId}`);
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
                <label className="label">Major Label</label>
                <div className="control">
                  <input
                    type="text"
                    value={majorLabel}
                    onChange={onChangeLabel}
                    className="input"
                    // placeholder="Subject"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Major Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={majorName}
                    onChange={onChangeMajorName}
                    className="input"
                    // placeholder="Subject"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      onChange={onChangeMajorCategory}
                      value={majorCategory}
                    >
                      <option value="IPA">IPA</option>
                      <option value="IPS">IPS</option>
                      <option value="BAHASA">Bahasa</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    type="text"
                    value={majorDescription}
                    onChange={onChangeMajorDescription}
                    className="textarea is-info"
                    // placeholder="Subject"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Extra Note</label>
                <div className="control">
                  <textarea
                    className="textarea is-info"
                    placeholder="Info textarea"
                    type="text"
                    value={majorExtraNote}
                    onChange={onChangeMajorExtraNote}
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

export default EditMajorForm;
