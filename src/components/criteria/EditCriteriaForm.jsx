import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const CriteriaList = () => {
  const [criteria, setCriteria] = useState([]);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const getCriteria = async () => {
    const response = await axios.get(`${API_URL}/api/criteria`);
    setCriteria(response.data);
  };

  useEffect(() => {
    getCriteria();
  }, []);

  const onClickBackButton = () => {
    navigate('/criteria');
  };

  const newCriteriaValue = (index, value, criteriaData) => {
    let filterData = criteria.filter((item) => item.uuid !== criteriaData.uuid);
    let body = {
      id: criteriaData.id,
      uuid: criteriaData.uuid,
      criteriaName: criteriaData?.criteriaName,
      criteriaValue: value,
    };
    filterData.push(body);
    filterData.sort((a, b) => a.id - b.id);
    setCriteria(filterData);
  };

  const onSubmitCriteria = async (e) => {
    e.preventDefault();
    try {
      const updateCriteriaData = criteria
        .map((data) => data.criteriaValue)
        .reduce((acc, currValue) => acc + currValue, 0);
      if (updateCriteriaData !== 100) {
        console.log(updateCriteriaData);
        setMsg('Criteria Total Value Not 100');
      } else {
        await axios.patch(`${API_URL}/api/criteria/edit`, {
          criteriaData: criteria,
        });
        navigate('/criteria');
      }
    } catch (error) {
      console.log('test');
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <h1 className="title">Criteria</h1>
      <h2 className="subtitle">Edit List Of Criteria</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={onSubmitCriteria} action="" method="post">
              <p className="has-text-center">{msg}</p>
              {criteria.map((criteria, index) => (
                <div key={index} className="field">
                  <label className="label">{criteria.criteriaName}</label>
                  <div className="control">
                    <input
                      type="number"
                      onChange={(e) => {
                        newCriteriaValue(
                          index,
                          e.target.valueAsNumber,
                          criteria,
                        );
                      }}
                      className="input"
                      placeholder={criteria.criteriaValue}
                    />
                  </div>
                </div>
              ))}

              {/* <div className="field">
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
              </div> */}
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

export default CriteriaList;
