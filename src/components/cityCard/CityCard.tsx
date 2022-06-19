import React, { Dispatch, useEffect, useState } from 'react';

import moment from 'moment';

import { getWeatherData } from '../../helpers/getWeatherData';
import { UpdateTime } from '../updateTime/UpdateTime';
import { WeatherDataType } from '../../types/types';

import './СityCard.scss';

interface CityCardProps {
  isCurrent: boolean;
  cityName?: string;
  citiesList?: string[];
  setCitiesLits?: Dispatch<React.SetStateAction<string[]>>;
}

export const CityCard: React.FC<CityCardProps> = ({ isCurrent, cityName }): JSX.Element => {
  const [refreshTime, setRefreshTime] = useState(moment());
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

  const url = isCurrent
    ? `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=auto:ip&aqi=no&alerts=no`
    : `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${cityName}&aqi=no`;

  useEffect(() => {
    getWeatherData(url).then((data) => setWeatherData(data));
  }, [url]);

  const handleReloadClick = async (): Promise<void> => {
    setRefreshTime(moment());
    setTime({ hours: 0, minutes: 0 });
    setWeatherData(await getWeatherData(url));
  };

  return (
    <div className="CityCard-Container">
      <div className="CityCard-CityName">
        {weatherData?.location.name}
        {isCurrent ? ', ' + weatherData?.location.country : ''}
      </div>
      <div className="CityCard-Location">
        {isCurrent ? 'Your current location' : weatherData?.location.country}
      </div>
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
