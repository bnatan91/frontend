import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddMajorForm = () => {
  const [majorLabel, setMajorLabel] = useState('');
  const [majorName, setMajorName] = useState('');
  const [majorCategory, setMajorCategory] = useState('IPA');
  const [majorDescription, setMajorDescription] = useState('');
  const [majorExtraNote, setMajorExtraNote] = useState('');
  const [msg, setMsg] = useState('');
  const { studentId } = useParams();

  const navigate = useNavigate();

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

  const onSubmitSubject = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/majors/${studentId}`, {
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
      <h1 className="title">Students</h1>
      <h2 className="subtitle">Add New Subjects</h2>
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
                    placeholder="Major Label"
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
                    placeholder="Major Name"
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
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Extra Note</label>
                <div className="control">
                  <textarea
                    className="textarea is-info"
                    placeholder="Info Extra Note"
                    type="text"
                    value={majorExtraNote}
                    onChange={onChangeMajorExtraNote}
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

export default AddMajorForm;
