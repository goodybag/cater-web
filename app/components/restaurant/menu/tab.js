import React, {Component, PropTypes} from 'react';
import url from 'url';
import cx from 'classnames';

export class RestaurantMenuTabComponent extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    }

    static contextTypes = {
        route: React.PropTypes.object.isRequired
    }

    render() {
        const {route} = this.context;
        const {href, children, type} = this.props;
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
