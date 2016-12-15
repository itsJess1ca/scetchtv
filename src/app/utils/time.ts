import * as moment from 'moment-timezone';
import { leftPad } from './leftpad';

export const convertTimeToLocal = (time: string, timezone: string = 'EST'): any => {
  const converted = convert24hour(time);
  const m = moment()
    .tz(timezone)
    .hour(converted.hour)
    .minute(converted.minute)
    .second(0)
    .local();
  return {
    hour: leftPad(m.hour()),
    minute: leftPad(m.minute()),
    timezone: moment.tz(moment.tz.guess()).zoneAbbr()
  };
};

export const convert24hour = (time: string): {hour: number, minute: number} => {
  const [_, hours, minutes] = /([\d]{2})([\d]{2})/.exec(time);
  if (!hours || !minutes) return;
  return {hour: parseInt(hours, 10), minute: parseInt(minutes, 10)};
};

