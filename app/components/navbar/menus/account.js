import React, {Component, PropTypes} from 'react';

import {NavbarMenuComponent, NavbarMenuLinkComponent} from '../menu';

export class NavbarAccountMenuComponent extends Component {
    render() {
        return (
            <NavbarMenuComponent>
                <NavbarMenuLinkComponent href="/users/me">Settings</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/users/me/rewards">My Rewards</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/auth/logout">Logout</NavbarMenuLinkComponent>
            </NavbarMenuComponent>
        );
    }
}
