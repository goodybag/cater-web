import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {Route} from 'hiroshima';
import url from 'url';
import cx from 'classnames';

@inject({
    route: Route
})
export class RestaurantMenuTabComponent extends Component {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        active: false
    };

    render() {
        const {href, children, type, active} = this.props;

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
