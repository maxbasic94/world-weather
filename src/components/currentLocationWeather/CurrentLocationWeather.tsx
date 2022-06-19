import React from 'react';
import { CityCard } from '../cityCard/CityCard';
import './CurrentLocationWeather.scss';

export const CurrentLocationWeather: React.FC = (): JSX.Element => {
  return (
    <div className="CurrentLocationWeather-Container">
      <div className="CurrentLocationWeather-Caption">World Weather</div>
      <div className="CurrentLocationWeather-Description">
        Watch weather in your current location
      </div>
      <CityCard isCurrent={true} />
    </div>
  );
};
