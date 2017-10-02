import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/share';

export class Event {
  type: String;
  data: any;
}

@Injectable()
export class EventAggregator {
  subject: Subject<Event>;

  constructor() {
    this.subject = new Subject<Event>();
  }

  publish(type: String, data: any) {
    this.subject.next({ type, data });
  }

  listenAll() {
    return this.subject.share();
  }

  unsubscribe() {
    this.subject.unsubscribe();
  }
}
