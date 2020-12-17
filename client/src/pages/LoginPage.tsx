import { Formik, Field, Form } from 'formik';
import React from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/Form/FormContainer';
import * as Yup from 'yup';
import FormInput from '../components/Form/FormInput';

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
            <Button variant='primary' type='submit'>
              Log in
            </Button>
          </FormGroup>
        </Form>
      </FormContainer>
    </Formik>
  );
};

export default LoginPage;
