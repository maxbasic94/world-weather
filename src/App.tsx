import React, { useEffect, useState } from 'react';

import { SearchCityModalWindow } from './components/AddCityModalWindow/AddCityModalWindow';
import { AnotherCitiesWeather } from './components/AnotherCitiesWeather/AnotherCitiesWeather';
import { CurrentLocationWeather } from './components/CurrentLocationWeather/CurrentLocationWeather';

import './App.scss';

export const App: React.FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [citiesList, setCitiesList] = useState<string[]>([]);

  useEffect(() => {
    const storageCities = localStorage.getItem('citiesList');
    storageCities !== null && setCitiesList(JSON.parse(storageCities));
  }, []);

  const handleClickAddCity = () => {
    setIsOpen(true);
  };

  return (
    <div className="Application-Container">
      <CurrentLocationWeather />
      <AnotherCitiesWeather citiesList={citiesList} setCitiesList={setCitiesList} />
      <button className="Application-Button_addCity" onClick={handleClickAddCity}>
        +
      </button>
      <SearchCityModalWindow
        open={isOpen}
        onOpen={setIsOpen}
        citiesList={citiesList}
        setCitiesList={setCitiesList}
      />
    </div>
  );
};
