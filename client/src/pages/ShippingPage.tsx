import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, FormGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { History } from 'history';
import FormInput from '../components/Form/FormInput';
import FormContainer from '../components/Form/FormContainer';
import { saveShippingInfo } from '../redux/actions/user/user';

interface Values {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingPageProps {
  history: History;
}

const initialValues: Values = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

const validationSchema = Yup.object({
  address: Yup.string().required(),
  city: Yup.string().required(),
  postalCode: Yup.string().required(),
  country: Yup.string().required(),
});

const ShippingPage: React.FC<ShippingPageProps> = ({ history }) => {
  const dispatch = useDispatch();
  return (
    <FormContainer>
      <h4>Shipping</h4>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(saveShippingInfo(values));
        }}
      >
        {({ dirty, isValid }) => (
          <Form>
            <FormGroup>
              <Field
                label='Address'
                name='address'
                component={FormInput}
                placeholder='Enter address'
              />
            </FormGroup>

            <FormGroup>
              <Field
                label='City'
                name='city'
                component={FormInput}
                placeholder='Enter city'
              />
            </FormGroup>

            <FormGroup>
              <Field
                label='Postal code'
                name='postalCode'
                component={FormInput}
                placeholder='Enter postal code'
              />
            </FormGroup>

            <FormGroup>
              <Field
                label='Country'
                name='country'
                component={FormInput}
                placeholder='Enter country'
              />
            </FormGroup>

            <FormGroup>
              <Button
                disabled={!isValid || !dirty}
                variant='primary'
                type='submit'
              >
                Next
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default ShippingPage;
