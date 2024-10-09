/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./selectMenu.css";
import CaretDownIcon from "../../assets/CaretDownIcon";

interface Option {
  label: string;
  value: string;
}

type Options = Option[];

const defaultOptions: Options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

function SelectMenu({
  onChange,
  options = defaultOptions,
  name,
  id,
  defaultValue,
}: {
  onChange?: (value: any) => void;
  options?: Options;
  name: string;
  id: string;
  defaultValue?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(
    () => options.find((option) => option.value === defaultValue) || options[0]
  );
  const [listIndex, setListIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setSelectedOption(
      options.find((option) => option.value === defaultValue) || options[0]
    );
  }, [defaultValue, options]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption.value);
    }
  }, [onChange, selectedOption]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setListIndex(findSelectedOptionIndex(option));
  };

  const findSelectedOptionIndex: (thisOption?: Option) => number = (
    thisOption
  ) => {
    if (thisOption !== undefined) {
      return options.findIndex((option) => option === thisOption);
    }
    return options.findIndex((option) => option === selectedOption);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (!isOpen) {
      if (event.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }
    switch (event.key) {
      case "ArrowUp":
        setListIndex(listIndex === 0 ? options.length - 1 : listIndex - 1);
        break;
      case "ArrowDown":
        setListIndex(listIndex === options.length - 1 ? 0 : listIndex + 1);
        break;
      case "Enter":
        handleOptionClick(options[listIndex]);
        break;
      case "Escape":
        setIsOpen(false);
        setListIndex(findSelectedOptionIndex());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      (listRef.current?.children[listIndex] as HTMLElement).scrollIntoView({
        block: "nearest",
      });
    }
  }, [listIndex, isOpen]);

  return (
    <div className={`selectmenu select-${name}`}>
      <select
        name={name}
        id={id}
        value={selectedOption.value}
        onChange={() => {}}
      >
        {options.map((option: Option, index: number) => (
          <option key={`${id}-option-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        className={`select-button ${isOpen ? "open" : ""}`}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
      >
        {selectedOption.label}
        <CaretDownIcon />
      </button>
      {isOpen && (
        <ul ref={listRef} className={`select-list`}>
          {options.map((option: Option, index: number) => (
            <li
              key={`${id}-option-${index}`}
              className={`select-option ${listIndex === index ? "focus" : ""}`}
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
