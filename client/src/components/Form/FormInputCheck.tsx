import React from 'react';
import { FieldProps } from 'formik';
import { FormCheck, FormCheckProps } from 'react-bootstrap';

interface FormInputCheckProps extends FormCheckProps {
  label?: string;
}

const FormInputCheck: React.FC<FormInputCheckProps & FieldProps> = ({
  type,
  label,
  field,
  form: { touched, errors },
  ...props
}) => (
  <>
    <FormCheck label={label} type={type} {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className='invalid-feedback' style={{ display: 'block' }}>
        {errors[field.name]}
      </div>
    )}
  </>
);

export default FormInputCheck;
