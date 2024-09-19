/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./selectMenu.css";

interface Option {
  label: string;
  value: string;
}

type Options = Option[];

function SelectMenu({
  onChange,
  options,
  name,
  id,
}: {
  onChange: (value: any) => void;
  options: Options;
  name: string;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [listIndex, setListIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      console.log("coucou");
      onChange(option.value);
    }
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log(event.key);
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
      // console.log(listRef.current?.children[listIndex]);
      // console.log(listIndex);
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
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        {selectedOption.label}
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
