import { Formik, Field, Form } from 'formik';
import React from 'react';
import { Button, FormGroup, FormLabel } from 'react-bootstrap';
import FormContainer from '../components/Form/FormContainer';

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: '',
  password: '',
};

const LoginPage = () => {
  return (
    <Formik
      initialValues={initialValues}
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
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <Field
              className='form-control'
              name='password'
              placeholder='Enter your password'
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
