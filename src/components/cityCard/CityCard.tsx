import React, { Dispatch, useEffect, useState } from 'react';

import moment from 'moment';

import { getWeatherData } from '../../helpers/getWeatherData';
import { UpdateTime } from '../UpdateTime/UpdateTime';
import { WeatherDataType } from '../../types/types';

import './CityCard.scss';
import { WEATHER_API_BASE } from '../../shared/constants';

interface CityCardProps {
  isCurrent: boolean;
  cityName?: string;
  citiesList?: string[];
  setCitiesList?: Dispatch<React.SetStateAction<string[]>>;
}

export const CityCard: React.FC<CityCardProps> = ({
  isCurrent,
  cityName,
  citiesList,
  setCitiesList,
}): JSX.Element => {
  const [refreshTime, setRefreshTime] = useState(moment());
  const [time, setTime] = useState({ hours: 0, minutes: 0 });
  const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);

  const url = isCurrent
    ? `${WEATHER_API_BASE}${process.env.REACT_APP_API_KEY}&q=auto:ip&aqi=no&alerts=no`
    : `${WEATHER_API_BASE}${process.env.REACT_APP_API_KEY}&q=${cityName}&aqi=no`;

  useEffect(() => {
    (async () => {
      const currentWeatherData = await getWeatherData(url);
      setWeatherData(currentWeatherData);
    })();
  }, [url]);

  const handleOnClickReload = async (): Promise<void> => {
    const currentWeatherData = await getWeatherData(url);
    setRefreshTime(moment());
    setTime({ hours: 0, minutes: 0 });
    setWeatherData(currentWeatherData);
  };

  const handleOnClickRemove = () => {
    if (setCitiesList && citiesList) {
      const filteredCitiesArray = citiesList.filter((city) => city !== cityName);
      setCitiesList(filteredCitiesArray);
    }
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
          className={isCurrent ? 'CityCard-Button_remove_hidden' : 'CityCard-Button_remove_visible'}
          onClick={handleOnClickRemove}
        >
          REMOVE
        </button>
        <button onClick={handleOnClickReload} className="CityCard-Button_reload">
          RELOAD
        </button>
      </div>
    </div>
  );
};
