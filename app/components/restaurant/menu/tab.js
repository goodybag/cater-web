import React, {Component, PropTypes} from 'react';
import url from 'url';
import cx from 'classnames';

export class RestaurantMenuTabComponent extends Component {
    static propTypes = {
        href: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired
    }

    static contextTypes = {
        route: React.PropTypes.object.isRequired
    }

    render() {
        const {route} = this.context;
        const {href, children} = this.props;
        const {path} = route;

        const {pathname} = url.parse(href);

        const active = path === pathname;

        const className = cx('gb-restaurant-menu-tab-title', {active});

        return (
            <a href={href} className={className}>
                <div className="gb-restaurant-menu-tab-title-content">{children}</div>
            </a>
        );
    }
}
