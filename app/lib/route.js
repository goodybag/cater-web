import {Route} from 'hiroshima';
import {dependencies} from 'yokohama';

/**
 * A representation of route params
 * from a route match result.
 *
 * Intended to be mocked for
 * route-dependency purposes.
 */
@dependencies(Route)
export class RouteParams {
    constructor(route) {
        return route.params;
    }
}
