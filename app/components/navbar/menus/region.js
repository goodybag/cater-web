import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';

import {User} from '../../../models/user';
import {CurrentUserStore} from '../../../stores/user';
import {NavbarMenuComponent, NavbarMenuLinkComponent} from '../menu';

@dependencies({
    currentUserStore: CurrentUserStore
})
@listeningTo(['currentUserStore'], ({currentUserStore}) => {
    return {
        user: currentUserStore.getUser()
    }
})
export class NavbarRegionMenuComponent extends Component {
    static propTypes = {
        user: PropTypes.instanceOf(User).isRequired
    }

    render() {
        const {user} = this.props;
        const {region: {name: regionName}} = user.attributes;
        const cityNames = ["Austin, TX", "Houston, TX", "Nashville, TN", "Seattle, WA", "None"];

        // TODO: Render these from a regions list
        return (
            <NavbarMenuComponent>
                <NavbarMenuLinkComponent href="/">Austin, TX</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/">Houston, TX</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/">Nashville, TN</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/">Seattle, WA</NavbarMenuLinkComponent>

                <NavbarMenuLinkComponent href="/">None</NavbarMenuLinkComponent>
            </NavbarMenuComponent>
        );
    }
}
