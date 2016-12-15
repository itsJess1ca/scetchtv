import { Component, OnInit } from '@angular/core';
import { convert24hour, convertTimeToLocal } from '../utils/time';
import { Twitch } from '../shared/twitch/twitch.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  _schedule: StreamSchedule[] = [
    {day: 'Monday', start: '0900', end: '1500'},
    {day: 'Tuesday', start: '0900', end: '1500'},
    {day: 'Wednesday', start: '0900', end: '1500'},
    {day: 'Thursday', start: '0900', end: '1500'},
    {day: 'Friday', start: '0900', end: '1500'},
    {day: 'Saturday', noStream: true},
    {day: 'Sunday', noStream: true}
  ];
  get schedule(): {days: string, slot: string}[] {
    let groupingStartDay: string;
    let previousSlot: StreamSchedule;
    return this._schedule.reduce((previousValue, currentValue) => {
      // Handle first iteration
      if (!previousValue[0] && !previousSlot) {
        groupingStartDay = currentValue.day;
        previousSlot = currentValue;
        return previousValue;
      }

      if (previousSlot.start === currentValue.start && previousSlot.end === currentValue.end) {
        // time is the same
        previousSlot = currentValue;
      } else {
        // Time is different, save previous slot and start again
        const startTime = convertTimeToLocal(previousSlot.start);
        const endTime = convertTimeToLocal(previousSlot.end);
        let tempGroup;
        if (groupingStartDay === previousSlot.day) {
          tempGroup = {
            days: `${groupingStartDay}`,
            slot: `${startTime.hour}:${startTime.minute} - ${endTime.hour}:${endTime.minute} ${endTime.timezone}`
          };
        } else {
          tempGroup = {
            days: `${groupingStartDay} - ${previousSlot.day}`,
            slot: `${startTime.hour}:${startTime.minute} - ${endTime.hour}:${endTime.minute} ${endTime.timezone}`
          };
        }
        groupingStartDay = currentValue.day;
        previousSlot = currentValue;

        // Handle "No Streams" - we want these individual
        if (currentValue.noStream) {
          return [...previousValue, tempGroup, {days: currentValue.day, slot: 'No Stream'}];
        }
        return [...previousValue, tempGroup];
      }

      // Handle "No Streams" - we want these individual
      if (currentValue.noStream) {
        return [...previousValue, {days: currentValue.day, slot: 'No Stream'}];
      }
      return previousValue;
    }, []);
  }

  private liveSubscription: Subscription = this.twitch.isLive.subscribe();
  constructor(private twitch: Twitch) { }

  ngOnInit() {
    console.log(this.schedule);
  }

}

export interface StreamSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  noStream?: boolean;
  start?: string;
  end?: string;
}
