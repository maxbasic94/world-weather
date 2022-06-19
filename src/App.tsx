import React, { useState } from 'react';
import { CurrentLocationWeather } from './components/currentLocationWeather/CurrentLocationWeather';
import './App.scss';
import { SearchCityModalWindow } from './components/addCityModalWindow/SearchCityModalWindow';
import { AnotherCitiesWeather } from './components/anotherCitiesWeather/AnotherCitiesWeather';

export const App: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [citiesList, setCitiesLits] = useState<string[]>([]);

  const handleClickAddCity = () => {
    setIsOpen(true);
  };

  return (
    <div className="Application-Container">
      <CurrentLocationWeather />
      <AnotherCitiesWeather citiesList={citiesList} />
      <button className="Application-Button_addCity" onClick={handleClickAddCity}>
        +
      </button>
      <SearchCityModalWindow
        open={isOpen}
        onOpen={setIsOpen}
        citiesList={citiesList}
        setCitiesLits={setCitiesLits}
      />
    </div>
  );
};
