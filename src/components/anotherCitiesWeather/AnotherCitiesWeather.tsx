import React from 'react';
import { CityCard } from '../cityCard/CityCard';
import './AnotherCitiesWeather.scss';

interface AnotherCitiesWeatherProps {
  citiesList: string[];
}

export const AnotherCitiesWeather: React.FC<AnotherCitiesWeatherProps> = ({
  citiesList,
}): JSX.Element => {
  return (
    <div className="StartPage-ExercisesList">
      {citiesList?.map((city) => (
        <CityCard key={city} isCurrent={false} cityName={city} />
      ))}
    </div>
  );
};
