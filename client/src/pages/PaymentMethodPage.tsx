import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/Form/FormContainer';
import * as Yup from 'yup';
import { RouteComponentProps } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import FormInputCheck from '../components/Form/FormInputCheck';
import { savePaymentMethod } from '../redux/actions/user/user';

interface Values {
  checked: string[];
}

interface PaymentMethodProps extends RouteComponentProps {}

const initialValues: Values = {
  checked: ['PayPal'],
};

const validationSchema = Yup.object({
  checked: Yup.array().required().length(1, 'payment method is required'),
});

const PaymentMethod: React.FC<PaymentMethodProps> = ({ history }) => {
  const dispatch = useDispatch();

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h4>Select the payment method </h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ checked }) => {
          dispatch(savePaymentMethod(checked[0]));
        }}
      >
        {({ isValid }) => (
          <Form>
            <FormGroup>
              <Field
                label='PayPal'
                type='checkbox'
                name='checked'
                value='PayPal'
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
