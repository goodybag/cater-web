import React, {Component, PropTypes} from 'react';
import {Dispatcher} from 'flux';

export class RestaurantMenuSearchboxComponent extends Component {
    static contextTypes = {
        dependencies: React.PropTypes.object.isRequired
    }

    static dependencies = {
        dispatcher: Dispatcher
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
