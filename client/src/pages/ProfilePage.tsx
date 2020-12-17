import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, Col, FormGroup, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import FormInput from '../components/Form/FormInput';
import { RouteComponentProps } from 'react-router-dom';
import { RootStore } from '../redux/store';
import Message from '../components/Message';
import Loader from '../components/Loader';

interface Values {
  email: string | undefined;
  password: string;
  confirmPassword: string;
  name: string | undefined;
}

interface ProfilePageProps extends RouteComponentProps {}

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

const ProfilePage: React.FC<ProfilePageProps> = () => {
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
    <Row>
      <Col md={3}>
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
            console.log(email, password, confirmPassword, name);
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
      </Col>

      <Col md={9}>
        <h1>Orders</h1>
      </Col>
    </Row>
  );
};

export default ProfilePage;
