import {Dispatcher, Store} from 'tokyo';
import {dependencies} from 'yokohama';

import {TickTimeAction} from '../actions/time-keeper';

@dependencies(Dispatcher)
export class TimeKeeperStore extends Store {
    constructor(dispatcher) {
        super(dispatcher);

        // TODO: localize this to user's timezone
        this.currentTime = new Date();

        this.bind(TickTimeAction, this.onTickTime);
    }

    getCurrentTime() {
        return this.currentTime;
    }

    onTickTime({nextTime}) {
        this.currentTime = nextTime;
        this.emit('change');
    }
}
