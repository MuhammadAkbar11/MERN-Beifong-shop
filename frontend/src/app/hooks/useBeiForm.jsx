import { useState, useCallback } from 'react';

const useBeiForm = ({ validationSchema, initialValues, onSubmit }) => {
  const [submitStatus, setSubmitStatus] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isChanges, setIsChanges] = useState(false);
  const [defaultValues, setDefaultValues] = useState('');
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(
    e => {
      const { value } = e.target;

      setIsChanges(defaultValues !== value);
      setSubmitStatus(defaultValues !== value);
      setValues(value);
    },
    [defaultValues]
  );

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      try {
        const isValid = await validationSchema.validate(values);
        if (submitStatus) {
          onSubmit(isValid);
          setIsChanges(false);
        }
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
