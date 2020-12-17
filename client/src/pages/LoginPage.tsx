import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import FormContainer from '../components/Form/FormContainer';
import * as Yup from 'yup';

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
});

const LoginPage = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <FormContainer>
        <Form>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <Field
              className='form-control'
              name='email'
              placeholder='Enter your email'
            />
            <ErrorMessage
              name='email'
              render={(err) => <div style={{ color: 'red' }}>{err}</div>}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <Field
              className='form-control'
              name='password'
              placeholder='Enter your password'
            />
            <ErrorMessage
              name='password'
              render={(err) => <div style={{ color: 'red' }}>{err}</div>}
            />
          </FormGroup>
          <FormGroup>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </FormGroup>
        </Form>
      </FormContainer>
    </Formik>
  );
};

export default LoginPage;
