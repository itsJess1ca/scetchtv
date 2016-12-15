import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export class Twitch {
  private _channel: string = 'scetchlink';
  client_id: string = 'sba9pwnxobx1kzqzd4vs5n4jdqp6ea8';

  constructor(private http: Http) {

  }

  get channel(): Observable<any> {
    return Observable
      .interval(10000)
      .flatMap(() =>
        this.http
          .get(`https://api.twitch.tv/kraken/streams/${this._channel}?client_id=${this.client_id}`)
          .map(res => res.json())
          .do((stream) => console.log('got stream', stream))
          .distinctUntilChanged()
          .catch((err) => Observable.of(err))
      );
  }

  get isLive(): Observable<boolean> {
    return this.channel
      .map(res => res.stream !== null)
      .do((isLive) => console.log('Stream is live: ', isLive))
  }

}
