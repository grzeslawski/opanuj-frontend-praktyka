import Input from "./atoms/Input";
import Select from "./atoms/Select";

const genderOptions = ['Any Gender', 'Female', 'Male', 'Genderless', 'Unknown'];
const sortOptions = ['Initial', 'Name', 'Created Date'];

type SearchFormProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

function SearchForm({
  name,
  setName,
  gender,
  setGender,
  sortOption,
  setSortOption,
}: SearchFormProps) {
  return (
    <form className="space-x-4 flex items-end justify-center">
      <Input label="Name" value={name} setter={(e) => setName(e)} />
      <Select label="Gender" value={gender} options={genderOptions} setter={(e) => setGender(e)} /> 
      <Select label="Sort by" value={sortOption} options={sortOptions} setter={(e) => setSortOption(e)} /> 
    </form>
  );
}

export default SearchForm;
