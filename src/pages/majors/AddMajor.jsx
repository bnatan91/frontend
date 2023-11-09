import { useEffect } from 'react';
import Layout from '../utils/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetMe } from '../../features/authSlice';
import AddMajorForm from '../../components/majors/AddMajorForm';

const AddMajor = () => {
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
      <AddMajorForm />
    </Layout>
  );
};

export default AddMajor;
