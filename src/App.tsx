import React, { useState } from 'react';
import { CurrentLocationWeather } from './components/currentLocationWeather/CurrentLocationWeather';
import './App.scss';
import { SearchCityModalWindow } from './components/addCityModalWindow/SearchCityModalWindow';

const App: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickAddCity = () => {
    setIsOpen(true);
  };
  return (
    <div className="Application-Container">
      <CurrentLocationWeather />
      <button className="Application-Button_addCity" onClick={handleClickAddCity}>
        +
      </button>
      <SearchCityModalWindow open={isOpen} onClose={setIsOpen} />
    </div>
  );
};

export default App;
