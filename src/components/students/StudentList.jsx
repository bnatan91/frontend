import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/config';

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const onClickDelete = (studentId) => {
    deleteSubject(studentId);
  };

  const getStudents = async () => {
    const response = await axios.get(`${API_URL}/api/students`);
    setStudents(response.data);
  };

  const deleteSubject = async (studentId) => {
    await axios.delete(`${API_URL}/api/students/${studentId}`);
    getStudents();
  };

  return (
    <>
      <h1 className="title">Students</h1>
      <h2 className="subtitle">List Of subjects</h2>
      <Link to="./add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Student Code</th>
            <th>Created By</th>
            <th>Updated By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.uuid}>
              <td>{index + 1}</td>
              <td>{student.studentCode}</td>
              <td>{student.createdBy}</td>
              <td>{student.updatedBy}</td>
              <td>
                <Link
                  to={`./${student.uuid}`}
                  className="button is-small is-info"
                >
                  edit
                </Link>
                <Link
                  to={`/majors/${student.uuid}`}
                  className="button is-small is-info ml-1"
                >
                  Majors
                </Link>
                <button
                  onClick={() => onClickDelete(student.uuid)}
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

export default StudentsList;
