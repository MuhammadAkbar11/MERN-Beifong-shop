import { useState, useCallback } from 'react';

const useBeiForm = ({ validationSchema, initialValues, onSubmit }) => {
  const [errors, setErrors] = useState(null);
  const [isChanges, setIsChanges] = useState(false);
  const [defaultValues, setDefaultValues] = useState('');
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;
      console.log(
        defaultValues !== '' && defaultValues !== value,
        defaultValues,
        value
      );
      setIsChanges(defaultValues !== value);
      setValues(value);
    },
    [defaultValues]
  );

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      try {
        const isValid = await validationSchema.validate(values);

        onSubmit(isValid);
        setErrors(null);
      } catch (error) {
        setErrors(error.errors[0]);
      }
    },
    [values]
  );

  const setInitValues = useCallback(value => {
    setDefaultValues(value);
    setValues(value);
  }, []);

  const handleCancel = () => {
    setValues(defaultValues);
    setErrors(null);
    setIsChanges(false);
  };

  return {
    values,
    errors,
    isChanges,
    setInitValues,
    handleCancel,
    handleChange,
    handleSubmit,
  };
};

export default useBeiForm;
