import { useState } from 'react';
import './DropdownMenu.css';
import arrowDown from '../assets/images/icon-arrow-down.svg';

interface Props {
  options: string[];
  onSelect: (option: string) => void;
}

function DropdownMenu({ options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  function handleOptionClick(option: string) {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className="dropdown-menu">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || 'Select an option'}{' '}
        <img src={arrowDown} alt="open-dropdown" />
      </button>
      <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
        {options.map((option) => (
          <li key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
