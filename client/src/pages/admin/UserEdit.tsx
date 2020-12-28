import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, FormGroup } from 'react-bootstrap';
import FormContainer from '../../components/Form/FormContainer';
import * as Yup from 'yup';
import FormInput from '../../components/Form/FormInput';
import { RouteComponentProps } from 'react-router-dom';
import { RootStore } from '../../redux/store';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { MatchParamsI } from '../../customTypes';
import { FormLabel } from 'react-bootstrap';

interface Values {
  email: string;
  name: string;
  isAdmin: boolean;
}

interface UserEditProps extends RouteComponentProps<MatchParamsI> {}

const initialValues: Values = {
  email: '',
  name: '',
  isAdmin: false,
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  name: Yup.string().required().min(3),
});

const UserEdit: React.FC<UserEditProps> = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector(
    (state: RootStore) => state.user
  );

  useEffect(() => {});

  return (
    <FormContainer>
      <h4>Update user profile</h4>
      {error && (
        <Message visible={true} variant='danger'>
          {error}
        </Message>
      )}
      {loading && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ dirty, isValid }) => (
          <Form>
            <FormGroup>
              <Field
                label='Name'
                name='name'
                component={FormInput}
                placeholder='Enter name'
              />
            </FormGroup>

            <FormGroup>
              <Field
                label='Email'
                name='email'
                component={FormInput}
                placeholder='Enter email'
              />
            </FormGroup>

            <FormGroup>
              <Field className='mr-2' type='checkbox' name='isAdmin' />
              <FormLabel>Admin</FormLabel>
            </FormGroup>

            <FormGroup>
              <Button
                disabled={!isValid || !dirty || loading}
                variant='primary'
                type='submit'
              >
                {loading ? 'Loading...' : 'Update'}
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default UserEdit;
