import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {Dispatcher} from 'flux';

@inject({
    dispatcher: Dispatcher
})
export class RestaurantMenuSearchboxComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired
    }

    render() {
        return (
            <div className="gb-restaurant-menu-searchbox">
                <input
                    defaultValue=""
                    placeholder="Search menu..."
                    type="text"
                />

                <div className="gb-search"/>
            </div>
        );
    }
}
