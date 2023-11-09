import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../config/config';

const MajorsList = () => {
  const [majors, setMajors] = useState([]);
  const { studentId } = useParams();

  useEffect(() => {
    getMajors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMajors = async () => {
    const response = await axios.get(`${API_URL}/api/majors/${studentId}`);
    setMajors(response.data);
  };

  const deleteMajor = async (majorId) => {
    await axios.delete(`${API_URL}/api/majors/${majorId}`);
    getMajors();
  };

  const onClickDelete = (majorId) => {
    deleteMajor(majorId);
  };

  return (
    <>
      <h1 className="title">Major</h1>
      <h2 className="subtitle">List Of Majors</h2>
      <Link to="./add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Major Name</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {majors.map((major, index) => (
            <tr key={major.uuid}>
              <td>{index + 1}</td>
              <td>{major.name}</td>
              <td>{}</td>
              <td>
                <Link
                  to={`./${major.uuid}`}
                  className="button is-small is-info"
                >
                  edit
                </Link>
                <button
                  onClick={() => onClickDelete(major.uuid)}
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
};

export default MajorsList;
