import React, {Component} from 'react';

export class NavbarSubbarAccountComponent extends Component {
    static propTypes = {

    }

    render() {
        const options = ["Settings", "My Rewards", "Logout"];

        return (
            <div className="gb-navbar-subbar-account">
                {options.map(renderOptions)}
            </div>
        );

        function renderOptions(option, i) {
            return (
                <div className="gb-navbar-subbar-account-option" key={i}>
                    {option}
                </div>
            );
        }
    }
}
