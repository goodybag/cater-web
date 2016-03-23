import React, {Component, PropTypes} from 'react';

import {NavbarMenuComponent, NavbarMenuLinkComponent} from '../menu';

export class NavbarOrderMenuComponent extends Component {
    render() {
        return (
            <NavbarMenuComponent>
                <NavbarMenuLinkComponent href="/">Start New Order</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/users/me/orders/calendar">My Orders</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/users/me/orders/receipts">My Receipts</NavbarMenuLinkComponent>
            </NavbarMenuComponent>
        );
    }
}
