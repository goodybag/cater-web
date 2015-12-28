import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

export class NavbarMenuComponent extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    render() {
        const {children} = this.props;

        return (
            <div className="gb-navbar-menu-container">
                <div className="gb-navbar-menu">
                    {children}
                </div>
            </div>
        );
    }
}

export class NavbarMenuLinkComponent extends Component {
    static propTypes = {
        href: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    };

    render() {
        const {href, children} = this.props;

        return (
            <a
                className={cx({
                    'gb-navbar-menu-link': true,
                    'gb-navbar-menu-link-active': this.props.active
                })}
                href={href}>
                {children}
            </a>
        );
    }
}
