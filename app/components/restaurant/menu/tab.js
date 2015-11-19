import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {Route} from 'hiroshima';
import url from 'url';
import cx from 'classnames';

import {RouteStore} from '../../../stores/route';

@inject({
    routeStore: RouteStore
})
@listeningTo([RouteStore], ({routeStore}) => {
    return {
        route: routeStore.getRoute()
    };
})
export class RestaurantMenuTabComponent extends Component {
    static propTypes = {
        route: PropTypes.instanceOf(Route).isRequired,
        type: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    }

    render() {
        const {href, children, type, route} = this.props;
        const {path} = route;

        const {pathname} = url.parse(href);

        const active = path === pathname;

        const className = cx(
            `gb-restaurant-menu-tab-title-${type}`,
            {active}
        );

        return (
            <a href={href} className={className}>
                <div className="gb-restaurant-menu-tab-title-content">{children}</div>
            </a>
        );
    }
}
