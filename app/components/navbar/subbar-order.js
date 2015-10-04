import React, {Component} from 'react';

export class NavbarSubbarOrderComponent extends Component {
    static propTypes = {

    }

    render() {
        const options = ["Start New Order", "My Orders", "My Receipts"];

        return (
            <div className="gb-navbar-subbar-order">
                {options.map(renderOptions)}
            </div>
        );

        function renderOptions(option, i) {
            return (
                <div className="gb-navbar-subbar-order-option" key={i}>
                    {option}
                </div>
            );
        }
    }
}
