import { useEffect } from 'react';
import Layout from '../utils/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetMe } from '../../features/authSlice';
import AddUserForm from '../../components/users/AddUserForm';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
    if (user && user.roles !== 'admin') {
      navigate('/dashboard');
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
      <AddUserForm />
    </Layout>
  );
};

export default AddUser;
