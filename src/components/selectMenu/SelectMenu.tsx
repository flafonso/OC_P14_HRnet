import { useState } from "react";
import "./selectMenu.css";

interface Option {
  label: string;
  value: string;
}

type Options = Option[];

function SelectMenu({
  options,
  name,
  id,
}: {
  options: Options;
  name: string;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={`selectmenu select-${name}`}>
      <select name={name} id={id}>
        {options.map((option: Option, index: number) => (
          <option key={`${id}-option-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        className={`select-button`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
      </button>
      {isOpen && (
        <ul className={`select-list`}>
          {options.map((option: Option, index: number) => (
            <li
              key={`${id}-option-${index}`}
              className={`select-option ${selectedOption === option ? "active" : ""}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SelectMenu;
