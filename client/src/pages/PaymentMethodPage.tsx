import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/Form/FormContainer';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router-dom';
import { RootStore } from '../redux/store';
import CheckoutSteps from '../components/CheckoutSteps';
import FormInputCheck from '../components/Form/FormInputCheck';

interface Values {
  payPal: boolean;
}

interface PaymentMethodProps extends RouteComponentProps {}

const initialValues: Values = {
  payPal: true,
};

const validationSchema = Yup.object({
  payPal: Yup.boolean().required().oneOf([true], 'payment method is required'),
});

const PaymentMethod: React.FC<PaymentMethodProps> = ({ history }) => {
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector(
    (state: RootStore) => state.user
  );

  useEffect(() => {}, []);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h4>Select the payment method </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isValid }) => (
          <Form>
            <FormGroup>
              <Field
                label='PayPal'
                type='checkbox'
                name='payPal'
                component={FormInputCheck}
              />
            </FormGroup>

            <FormGroup>
              <Button disabled={!isValid} variant='primary' type='submit'>
                Next
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default PaymentMethod;
