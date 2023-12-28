import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';

const CriteriaList = () => {
  const [criteria, setCriteria] = useState([]);

  const getCriteria = async () => {
    const response = await axios.get(`${API_URL}/api/criteria`);
    setCriteria(response.data);
  };

  useEffect(() => {
    getCriteria();
  }, []);

  return (
    <>
      <h1 className="title">Criteria</h1>
      <h2 className="subtitle">List Of Criteria</h2>
      <Link to="./edit" className="button is-primary mb-2">
        Edit Criteria Value
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Criteria Name</th>
            <th>Criteria Value</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, index) => (
            <tr key={criterion.uuid}>
              <td>{index + 1}</td>
              <td>{criterion.criteriaName}</td>
              <td>{criterion.criteriaValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CriteriaList;
