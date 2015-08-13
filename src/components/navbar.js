import React, {Component} from 'react';

import {User} from '../models/user';

export class NavbarComponent extends Component {
    static contextTypes = {
        user: React.PropTypes.instanceOf(User).isRequired
    }

    render() {
        const {user} = this.context;
        const {points, name} = user.toJSON();

        return (
            <div className="gb-navbar-container">
                <div className="gb-navbar">
                    <div className="gb-navbar-left">
                        <div className="gb-navbar-logo">
                            <img className="gb-navbar-logo-large" width={155} height={30} src="logo-large.svg"/>
                            <img className="gb-navbar-logo-small" height={40} src="logo-small.svg"/>
                        </div>
                    </div>

                    <div className="gb-navbar-right">
                        <div className="gb-navbar-points">
                            <div className="gb-navbar-points-text">{points} points</div>
                        </div>

                        <div className="gb-navbar-account">
                            <div className="gb-navbar-account-button">{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
