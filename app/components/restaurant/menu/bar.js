import React, {Component, PropTypes, cloneElement} from 'react';
import {inject} from 'yokohama';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import {RestaurantMenuSearchboxComponent} from './searchbox';
import {RestaurantMenuTabsComponent} from './tabs';
import {MenuSearchTerm} from '../../../lib/menu-search';

@inject({}, [
    RestaurantMenuSearchboxComponent,
    RestaurantMenuTabsComponent
])
export class RestaurantMenuBarComponent extends Component {
    static propTypes = {
        searchTerm: PropTypes.instanceOf(MenuSearchTerm).isRequired,
        onSearchTermChange: PropTypes.func.isRequired
    };

    render() {
        const {searchTerm, onSearchTermChange} = this.props;

        return (
            <RestaurantMenuBarWrapperComponent>
                <div className="gb-restaurant-menu-bar-content">
                    <RestaurantMenuSearchboxComponent
                        searchTerm={searchTerm}
                        onSearchTermChange={onSearchTermChange}
                    />

                    <RestaurantMenuTabsComponent/>
                </div>
            </RestaurantMenuBarWrapperComponent>
        );
    }
}

export class RestaurantMenuBarWrapperComponent extends Component {
    static propTypes = {
        children: PropTypes.node
    };
    render() {
        const {children} = this.props;

        return (
            <div className="gb-restaurant-menu-bar-container">
                {children}
            </div>
        );
    }
}
