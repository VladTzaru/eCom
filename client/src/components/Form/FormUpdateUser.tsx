import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, FormGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import FormInput from './FormInput';
import { RootStore } from '../../redux/store';
import Message from '../Message';
import Loader from '../Loader';
import { update } from '../../redux/actions/user/user';

interface Values {
  email: string | undefined;
  password: string;
  confirmPassword: string;
  name: string | undefined;
}

interface FormUpdateUserProps {}

const initialValues: Values = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'passwords must match'
  ),
  name: Yup.string().required().min(3),
});

const FormUpdateUser: React.FC<FormUpdateUserProps> = () => {
  const dispatch = useDispatch();
  const { userDetails, error, loading } = useSelector(
    (state: RootStore) => state.user
  );

  useEffect(() => {
    if (userDetails) {
      initialValues.name = userDetails.name;
      initialValues.email = userDetails.email;
    }
  }, [userDetails]);

  return (
    <>
      <h4>Update your account</h4>
      {error && (
        <Message visible={true} variant='danger'>
          {error}
        </Message>
      )}
      {loading && <Loader />}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ email, password, confirmPassword, name }) => {
          if (email && name && userDetails!.token)
            dispatch(
              update(email, password, confirmPassword, name, userDetails!.token)
            );
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
              <Field
                label='Password'
                name='password'
                type='password'
                component={FormInput}
                placeholder='Enter password'
              />
            </FormGroup>

            <FormGroup>
              <Field
                label='Confirm password'
                name='confirmPassword'
                type='password'
                component={FormInput}
                placeholder='Confirm password'
              />
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
    </>
  );
};

export default FormUpdateUser;
