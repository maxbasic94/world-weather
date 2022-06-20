import React, { Dispatch } from 'react';
import { CityCard } from '../CityCard/CityCard';
import './AnotherCitiesWeather.scss';

interface AnotherCitiesWeatherProps {
  citiesList: string[];
  setCitiesList: Dispatch<React.SetStateAction<string[]>>;
}

export const AnotherCitiesWeather: React.FC<AnotherCitiesWeatherProps> = ({
  citiesList,
  setCitiesList,
}): JSX.Element => {
  return (
    <div className="AnotherCitiesWeather-Container">
      {citiesList.map((city) => (
        <CityCard
          key={city}
          isCurrent={false}
          cityName={city}
          citiesList={citiesList}
          setCitiesList={setCitiesList}
        />
      ))}
    </div>
  );
};
