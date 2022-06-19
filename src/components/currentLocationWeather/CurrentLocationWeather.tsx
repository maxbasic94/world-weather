import React, { useEffect, useState } from 'react';
import { Current, Location } from '../../types/types';
import { CityCard } from '../cityCard/CityCard';
import './CurrentLocationWeather.scss';

export const CurrentLocationWeather: React.FC = (): JSX.Element => {
  const [currentLocationData, setCurrentLocationData] = useState<{
    location: Location;
    current: Current;
  } | null>(null);
  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=auto:ip&aqi=no&alerts=no`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data && setCurrentLocationData(data);
      });
  }, [url]);

  return (
    <div className="CurrentLocationWeather-Container">
      <div className="CurrentLocationWeather-Caption">World Weather</div>
      <div className="CurrentLocationWeather-Description">
        Watch weather in your current location
      </div>
      <CityCard isCurrent={true} weatherData={currentLocationData} />
    </div>
  );
};
