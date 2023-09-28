import React, { useEffect } from 'react';
import Layout from './Layout';
import AddSubjectForm from '../components/AddSubjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetMe } from '../features/authSlice';

const AddSubject = () => {
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
      <AddSubjectForm />
    </Layout>
  );
};

export default AddSubject;
