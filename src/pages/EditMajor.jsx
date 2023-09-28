import React, { useEffect } from 'react';
import Layout from './Layout';
import EditSubjectForm from '../components/EditSubjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetMe } from '../features/authSlice';
import EditMajorForm from '../components/EditMajorForm';

function EditMajor() {
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
      <EditMajorForm />
    </Layout>
  );
}

export default EditMajor;
