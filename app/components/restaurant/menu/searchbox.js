import React, {Component, PropTypes} from 'react';

import {MenuSearchTerm} from '../../../lib/menu-search';

export class RestaurantMenuSearchboxComponent extends Component {
    static propTypes = {
        searchTerm: PropTypes.instanceOf(MenuSearchTerm).isRequired,
        onSearchTermChange: PropTypes.func.isRequired
    };

    handleChange = (event) => {
        const {onSearchTermChange} = this.props;
        const {value: text} = event.target;

        onSearchTermChange(text);
    }

    render() {
        const {searchTerm} = this.props;
        const {searchTermText} = searchTerm;

        return (
            <div className="gb-restaurant-menu-searchbox">
                <input
                    value={searchTermText}
                    placeholder="Search menu"
                    type="text"
                    onChange={this.handleChange}
                />

                <div className="gb-search"/>
            </div>
        );
    }
}
