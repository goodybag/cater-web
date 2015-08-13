import React, {Component} from 'react';

export class NavbarComponent extends Component {
    render() {
        const points = 500;

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
                            <div className="gb-navbar-account-button">My Account</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
