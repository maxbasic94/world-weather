import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Current, Location } from '../../types/types';
import './СityCard.scss';

interface CityCardProps {
  isCurrent?: boolean;
  weatherData: {
    location: Location;
    current: Current;
  } | null;
}

export const CityCard: React.FC<CityCardProps> = ({ isCurrent, weatherData }): JSX.Element => {
  const [lastUpdateTime, setLastUpdateTime] = useState({ hours: 0, minutes: 0 });
  const initialTime = moment();
  console.log(lastUpdateTime);

  useEffect(() => {
    setTimeout((): void => {
      const totalMinute = Math.round(moment().diff(initialTime) / (1000 * 60));
      setLastUpdateTime({ hours: Math.floor(totalMinute / 60), minutes: totalMinute % 60 });
    }, 60000);
  }, [initialTime]);

  return (
    <div className="cityCardContainer">
      <div className="cityName">
        {weatherData?.location.name}, {weatherData?.location.country}
      </div>
      <div className="cityCardDescription">Your current location</div>
      <div className="conditionContainer">
        <div className="conditionCaption">Weather</div>
        <div className="conditionText">{weatherData?.current.condition.text}</div>
      </div>
      <hr className="dividingLine" />
      <div className="temperatureContainer">
        <div className="temperatureCaption">Temperature</div>
        <div className="temperatureText">{weatherData?.current.temp_c}°C</div>
      </div>
      <hr className="dividingLine" />
      <div className="humidityContainer">
        <div className="humidityCaption">Humidity</div>
        <div className="humidityText">{weatherData?.current.humidity}%</div>
      </div>
      <hr className="dividingLine" />
      <div className="lastUpdateTime">
        {lastUpdateTime.hours > 0
          ? lastUpdateTime.hours + ' hours '
          : lastUpdateTime.minutes + ' minutes '}
        ago
      </div>
      <div className="buttonsContainer">
        <button className="removeButton" style={{ visibility: isCurrent ? 'hidden' : 'visible' }}>
          remove
        </button>
        <button className="reloadButton">reload</button>
      </div>
    </div>
  );
};
