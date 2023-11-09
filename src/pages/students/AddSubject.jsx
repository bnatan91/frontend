import { useEffect } from 'react';
import Layout from '../utils/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetMe } from '../../features/authSlice';
import AddStudentForm from '../../components/students/AddStudentForm';

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <AddStudentForm />
    </Layout>
  );
};

export default AddStudent;
