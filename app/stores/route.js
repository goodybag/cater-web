import {Store} from 'tokyo';
import {dependencies} from 'yokohama';
import {Route} from 'hiroshima';
import {Dispatcher} from 'flux';

@dependencies(Dispatcher, Route)
export class RouteStore extends Store {
    constructor(dispatcher, route) {
        super(dispatcher);

        this.route = route;
    }

    getRoute() {
        return this.route;
    }
}
