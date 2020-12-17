import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, Col, FormGroup, Row } from 'react-bootstrap';
import FormContainer from '../components/Form/FormContainer';
import * as Yup from 'yup';
import FormInput from '../components/Form/FormInput';
import { Link, RouteComponentProps } from 'react-router-dom';
import { RootStore } from '../redux/store';
import { login } from '../redux/actions/user/user';
import Message from '../components/Message';
import Loader from '../components/Loader';

interface Values {
  email: string;
  password: string;
}

interface LoginPageProps extends RouteComponentProps {}

const initialValues: Values = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

const LoginPage: React.FC<LoginPageProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector(
    (state: RootStore) => state.user
  );

  useEffect(() => {
    if (userDetails) history.push('/');
  }, [history, userDetails]);

  return (
    <FormContainer>
      <h4>Login to your account</h4>
      {error && (
        <Message visible={true} variant='danger'>
          {error}
        </Message>
      )}
      {loading && <Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ email, password }) => {
          dispatch(login(email, password));
        }}
      >
        {({ dirty, isValid }) => (
          <Form>
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
              <Button
                disabled={!isValid || !dirty || loading}
                variant='primary'
                type='submit'
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>

      <Row className='py-3'>
        <Col>
          <span>New Customer?</span> <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
