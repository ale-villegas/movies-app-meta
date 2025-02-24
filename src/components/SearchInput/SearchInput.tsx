import { ChangeEventHandler } from "react";
import "./SearchInput.scss";
import { InputText } from "primereact/inputtext";


interface SearchInputProps {
  handleChange: ChangeEventHandler<HTMLInputElement>
  value: string;
}

export const SearchInput = ({ handleChange, value }: SearchInputProps) => {
  return (
    <InputText
      className="search-input"
      placeholder="Search movies.."
      value={value}
      onChange={handleChange}
    />
  );
};
