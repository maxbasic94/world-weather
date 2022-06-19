import React, { useEffect } from 'react';

import moment from 'moment';

import './UpdateTime.scss';

interface UpdateTimeProps {
  refreshTime: moment.Moment;
  time: { hours: number; minutes: number };
  setTime: React.Dispatch<
    React.SetStateAction<{
      hours: number;
      minutes: number;
    }>
  >;
}

export const UpdateTime: React.FC<UpdateTimeProps> = ({
  refreshTime,
  time,
  setTime,
}): JSX.Element => {
  useEffect(() => {
    const interval = setInterval(() => {
      const totalMinute = moment().diff(moment(refreshTime), 'minutes');
      setTime({ hours: Math.floor(totalMinute / 60), minutes: totalMinute % 60 });
    }, 60000);
    return () => clearInterval(interval);
  }, [refreshTime, setTime]);

  return (
    <div className="LastUpdateTime">
      {time.hours > 0 ? time.hours + ' hours ' : time.minutes + ' minutes '}
      ago
    </div>
  );
};
