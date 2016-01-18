import React, {Component, PropTypes} from 'react';
import {Dispatcher} from 'flux';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';

import {User} from '../../../models/user';
import {UpdateUserRegionAction} from '../../../actions/user';
import {CurrentUserStore} from '../../../stores/user';
import {NavbarMenuComponent, NavbarMenuLinkComponent} from '../menu';

const regions = [
    { id: 1, name: 'Austin, TX' },
    { id: 2, name: 'None' },
    { id: 3, name: 'Houston, TX' },
    { id: 4, name: 'Seattle, WA' },
    { id: 5, name: 'Nashville, TN' }
];

@inject({
    dispatcher: Dispatcher,
    currentUserStore: CurrentUserStore
})
@listeningTo([CurrentUserStore], ({currentUserStore}) => {
    return {
        user: currentUserStore.getUser()
    }
})
export class NavbarRegionMenuComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        user: PropTypes.instanceOf(User).isRequired
    };

    render() {
        const {user} = this.props;

        // TODO: Render these from a regions list
        return (
            <select
                value={user.region.id}
                onChange={this.onRegionChange.bind(this)}
            >
                {regions.map((region) => {
                    return (
                        <option
                            key={region.id}
                            value={region.id}
                        >{region.name}</option>
                    );
                })}
            </select>
        );
    }

    onRegionChange(e) {
        var action = new UpdateUserRegionAction(
            regions.filter(region => region.id == e.target.value)[0]
        );

        this.props.dispatcher.dispatch(action);
    }
}
