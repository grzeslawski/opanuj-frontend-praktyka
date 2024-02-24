import FormField from './FormField';

type InputProps = {
  label: string;
  value: string;
  setter: (name: string) => void;
};

function Input({ label, value, setter }: InputProps) {
  return (
    <FormField label={label}>
      <input
        className="border h-7 mt-1 indent-2"
        type="text"
        placeholder="Rick Sanchez..."
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </FormField>
  );
}

export default Input;
