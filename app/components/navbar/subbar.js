import React, {Component, PropTypes} from 'react';
import cxnames from "classnames";

import {NavbarSubbarCityComponent} from './subbar-city';
import {NavbarSubbarOrderComponent} from './subbar-order';
import {NavbarSubbarAccountComponent} from './subbar-account';

export class NavbarSubbarComponent extends Component {
    static propTypes = {
        cityBtnActive: PropTypes.bool.isRequired,
        orderBtnActive: PropTypes.bool.isRequired,
        accountBtnActive: PropTypes.bool.isRequired,
        currentCity: PropTypes.string.isRequired
    }

    render() {
        const {cityBtnActive, orderBtnActive, accountBtnActive, currentCity} = this.props;
        const oneSelected = cityBtnActive || orderBtnActive || accountBtnActive;

        return (
            <div className={"gb-navbar-subbar-container" + cxnames({"-active":oneSelected})}>
                <div className="gb-navbar-subbar">
                    {
                        cityBtnActive ?
                            <NavbarSubbarCityComponent currentCity={currentCity} /> :
                        orderBtnActive ?
                            <NavbarSubbarOrderComponent /> :
                        accountBtnActive ?
                            <NavbarSubbarAccountComponent /> : ""
                    }
                </div>
            </div>
        );
    }
}
