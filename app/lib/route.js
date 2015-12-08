import {Route} from 'hiroshima';
import {dependencies} from 'yokohama';

@dependencies(Route)
export class RouteParams {
    constructor(route) {
        return route.params;
    }
}
