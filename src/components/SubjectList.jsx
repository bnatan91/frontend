import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const response = await axios.get(
      'https://monkfish-app-hmwl9.ondigitalocean.app/subjects',
    );
    setSubjects(response.data);
  };

  const deleteSubject = async (subjectId) => {
    console.log(subjectId);
    await axios.delete(
      `https://monkfish-app-hmwl9.ondigitalocean.app/subjects/${subjectId}`,
    );
    getSubjects();
  };

  const onClickDelete = (subjectId) => {
    deleteSubject(subjectId);
  };

  return (
    <>
      <h1 className="title">Subject</h1>
      <h2 className="subtitle">List Of subjects</h2>
      <Link to="./add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Subject Name</th>
            <th>Category</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject.uuid}>
              <td>{index + 1}</td>
              <td>{subject.name}</td>
              <td>{subject.category}</td>
              <td>{subject.user.name}</td>
              <td>
                <Link
                  to={`./edit/${subject.uuid}`}
                  className="button is-small is-info"
                >
                  edit
                </Link>
                <button
                  onClick={() => onClickDelete(subject.uuid)}
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

export default SubjectsList;
