import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MajorList() {
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    getMajors();
  }, []);

  const getMajors = async () => {
    const response = await axios.get(
      'http://monkfish-app-hmwl9.ondigitalocean.app/majors',
    );
    setMajors(response.data);
  };

  const deleteMajors = async (majorId) => {
    await axios.delete(
      `http://monkfish-app-hmwl9.ondigitalocean.app/majors/${majorId}`,
    );
    getMajors();
  };

  const onClickHandler = (majorId) => {
    deleteMajors(majorId);
  };

  return (
    <>
      <h1 className="title">Major</h1>
      <h2 className="subtitle">List Of Major</h2>
      <Link to="./add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Major Name</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {majors.map((majors, index) => (
            <tr key={majors.uuid}>
              <td>{index + 1}</td>
              <td>{majors.name}</td>
              <td>{majors.category}</td>
              <td>{majors.user.name}</td>
              <td>
                <Link
                  to={`./edit/${majors.uuid}`}
                  className="button is-small is-info"
                >
                  edit
                </Link>
                <button
                  onClick={() => onClickHandler(majors.uuid)}
                  className="button is-small is-danger ml-1"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MajorList;
