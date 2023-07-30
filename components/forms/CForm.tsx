import { FormProvider, useFormContext } from "@/contexts/CFormContext";

const CForm = ({ children, ...props }: any) => {
  const { setFieldError, errors } = useFormContext();

  const formValid = () => {
    const newErrors: any = {};

    Object.entries(props.validationRules).forEach(([fieldName, rules]) => {
      const { required }: any = rules;
      const value = props.formData[fieldName];

      if (required && !value) {
        newErrors[fieldName] = true;
      }
    });

    Object.keys(newErrors).forEach((fieldName) => {
      setFieldError(fieldName, newErrors[fieldName]);
      console.log(errors);
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValid()) {
      const firstErrorField = Object.entries(errors).find(([fieldName, hasError]) => hasError);
      if (firstErrorField) {
        const [fieldName] = firstErrorField;
        const fieldRef = document.getElementsByName(fieldName)[0];
        if (fieldRef) {
          fieldRef.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      props.handleSubmit();
    }
  }

  return (
    <>
      <FormProvider>
        <form onSubmit={(e) => handleSubmit(e)}>
          {children}
        </form>
      </FormProvider>
    </>
  );
}

export default CForm;