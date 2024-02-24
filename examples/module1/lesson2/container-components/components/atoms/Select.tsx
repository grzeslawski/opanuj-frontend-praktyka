import FormField from './FormField';

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  setter: (name: string) => void;
};

function Select({ label, value, options, setter }: SelectProps) {
  return (
    <FormField label={label}>
      <select
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="border h-7 mt-1"
      >
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export default Select;
