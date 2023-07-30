import React, { createContext, useContext, useState } from 'react';

// Define the type for the form errors object
interface FormErrors {
  [fieldName: string]: boolean | undefined;
}

// Define the type for the FormContext
interface FormContextType {
  errors: FormErrors;
  setFieldError: (fieldName: string, error: boolean | undefined) => void;
}

// Create the FormContext
const FormContext = createContext<FormContextType>({
  errors: {},
  setFieldError: () => { },
});

// Create a custom hook to access the FormContext
export const useFormContext = () => {
  return useContext(FormContext);
};

type FormProviderProps = {
  children: React.ReactNode; //👈 children prop typr
};
// FormProvider component
export const FormProvider: React.FC<FormProviderProps> = (props: FormProviderProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const setFieldError = (fieldName: string, error: boolean | undefined) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  return (
    <FormContext.Provider value={{ errors, setFieldError }}>
      {props.children}
    </FormContext.Provider>
  );
};