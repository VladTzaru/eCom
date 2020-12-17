import { Formik } from 'formik';
import React from 'react';
import { Form, Button } from 'react-bootstrap';

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
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={values.email}
                onChange={handleChange}
                type='email'
                placeholder='Enter email'
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={values.password}
                type='password'
                onChange={handleChange}
                placeholder='Password'
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
