import React from 'react';
import { CurrentLocationWeather } from './components/currentLocationWeather/CurrentLocationWeather';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="applicationContainer">
      <CurrentLocationWeather />
    </div>
  );
};

export default App;
