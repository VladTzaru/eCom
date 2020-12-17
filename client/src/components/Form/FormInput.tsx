import React from 'react';
import { FieldProps } from 'formik';
import { FormControl, FormLabel } from 'react-bootstrap';

interface FormInputCustomProps {
  type?: string;
  label?: string;
}

const FormInput: React.FC<FormInputCustomProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  type = 'text',
  label,
  ...props
}) => {
  console.log(errors[field.name]);
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl
        isInvalid={touched && !!errors[field.name]}
        type={type}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <div style={{ color: 'red' }}>{errors[field.name]}</div>
      )}
    </>
  );
};

export default FormInput;
