import logo from './assets/images/logo.svg';
import DropdownMenu from './components/DropdownMenu';
import moon from './assets/images/icon-moon.svg';
import moonActive from './assets/images/icon-moon-active.svg';
import './Navbar.css';
import { useEffect, useState } from 'react';

const setCssProperty = document.documentElement.style;

const Navbar = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeFont, setActiveFont] = useState('Sans Serif');

  function handleOnSelect(option: string) {
    // console.log(option);
    setActiveFont(option);
  }

  useEffect(() => {
    if (activeFont === 'Sans Serif') {
      setCssProperty.setProperty('--font', 'inter');
    } else if (activeFont === 'Serif') {
      setCssProperty.setProperty('--font', 'lora');
    } else {
      setCssProperty.setProperty('--font', 'inconsolata');
    }
  }, [activeFont]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsDarkTheme(e.target.checked);
  }

  useEffect(() => {
    if (isDarkTheme) {
      setCssProperty.setProperty('--backgroundColor', 'var(--dark100)');
      setCssProperty.setProperty('--borderColor', 'var(--dark400)');
      setCssProperty.setProperty('--inputBackground', 'var(--dark200)');
      setCssProperty.setProperty('--dropDownColor', 'var(--dark200)');
      setCssProperty.setProperty('--dropShadowColor', '164, 69, 237, 0.55');
      setCssProperty.setProperty('--fontColor', 'var(--light100)');
    } else {
      setCssProperty.setProperty('--backgroundColor', 'var(--light100)');
      setCssProperty.setProperty('--borderColor', 'var(--light300)');
      setCssProperty.setProperty('--inputBackground', 'var(--light200)');
      setCssProperty.setProperty('--dropDownColor', 'var(--light100)');
      setCssProperty.setProperty('--dropShadowColor', '0,0,0, 0.15');
      setCssProperty.setProperty('--fontColor', 'var(--dark300)');
    }
  }, [isDarkTheme]);

  return (
    <nav>
      <img src={logo} alt="logo" />
      <div className="right">
        <DropdownMenu
          options={['Sans Serif', 'Serif', 'Mono']}
          onSelect={handleOnSelect}
        />
        <span className="test"></span>
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleChange}
            id="darkTheme"
            name="darkTheme"
          />
          <span className="slider round"></span>
        </label>
        <img
          src={!isDarkTheme ? moon : moonActive}
          alt="dark theme icon"
          className="moon"
        />
      </div>
    </nav>
  );
};

export default Navbar;
