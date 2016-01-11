import React, {Component, PropTypes} from 'react';

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
            <a className="gb-navbar-menu-link" href={href}>
                {children}
            </a>
        );
    }
}
