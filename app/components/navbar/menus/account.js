import React, {Component, PropTypes} from 'react';

import {NavbarMenuComponent, NavbarMenuLinkComponent} from '../menu';

export class NavbarAccountMenuComponent extends Component {
    render() {
        return (
            <NavbarMenuComponent>
                <NavbarMenuLinkComponent href="/">Settings</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/">My Rewards</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/">Logout</NavbarMenuLinkComponent>
            </NavbarMenuComponent>
        );
    }
}
