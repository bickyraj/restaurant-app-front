interface Input {
  type: string;
  value?: string | number;
  name: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  errorMessage?: string;
}

const CInput = ({ type, value, name, handleChange, hasError, errorMessage }: Input) => {
  return (
    <>
      <input type={type} name={name} value={value} onChange={handleChange} id={name} className={`block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`} />
      {hasError && <span className="text-red-500 text-sm">{errorMessage ?? "This field is required."}</span>}
    </>
  );
}

export default CInput;