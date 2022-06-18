import React, { useState } from 'react';
import { UpdateTime } from '../updateTime/cityCard/UpdateTime';
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
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [time, setTime] = useState({ hours: 0, minutes: 0 });

  const handleReloadClick = (): void => {
    setRefreshTime(new Date());
    setTime({ hours: 0, minutes: 0 });
  };

  return (
    <div className="CityCard-Container">
      <div className="CityCard-CityName">
        {weatherData?.location.name}, {weatherData?.location.country}
      </div>
      <div className="CityCard-Description">Your current location</div>
      <div className="CityCard-Condition_container">
        <div className="CityCard-Condition_caption">Weather</div>
        <div className="CityCard-Condition_text">{weatherData?.current.condition.text}</div>
      </div>
      <hr className="CityCard-DividingLine" />
      <div className="CityCard-Temperature_container">
        <div className="CityCard-Temperature_caption">Temperature</div>
        <div className="CityCard-Temperature_text">{weatherData?.current.temp_c}°C</div>
      </div>
      <hr className="CityCard-DividingLine" />
      <div className="CityCard-Humidity_container">
        <div className="huCityCard-Humidity_caption">Humidity</div>
        <div className="CityCard-Humidity_Text">{weatherData?.current.humidity}%</div>
      </div>
      <hr className="CityCard-DividingLine" />
      <UpdateTime refreshTime={refreshTime} time={time} setTime={setTime} />
      <div className="CityCard-Buttons_container">
        <button
          className="CityCard-Button_remove"
          style={{ visibility: isCurrent ? 'hidden' : 'visible' }}
        >
          remove
        </button>
        <button onClick={handleReloadClick} className="CityCard-Button_reload">
          reload
        </button>
      </div>
    </div>
  );
};
