import { ChangeEventHandler } from "react";
import "./SearchInput.scss";
import { InputText } from "primereact/inputtext";


interface SearchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string;
}

export const SearchInput = ({ onChange, value }: SearchInputProps) => {
  return (
    <InputText
      className="search-input"
      placeholder="Search movies.."
      value={value}
      onChange={onChange}
    />
  );
};
