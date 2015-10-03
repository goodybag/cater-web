import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';
import cxnames from 'classnames';

import {CurrentUserStore} from '../../stores/user';
import {CurrentUser} from '../../models/user';

@dependencies({
    currentUserStore: CurrentUserStore
})
@listeningTo(['currentUserStore'], dependencies => {
    const {currentUserStore} = dependencies;

    return {
        user: currentUserStore.getUser()
    }
})

export class NavbarComponent extends Component {
    static propTypes = {
        user: PropTypes.instanceOf(CurrentUser)
    }

    state = {
        cityBtnActive: false,
        orderBtnActive: false,
        accountBtnActive: false
    }

    handleNavBtnClick = (btn) => {
        if(btn==="my-city") {
            console.log("City button clicked!");
            this.setState({
                cityBtnActive: !this.state.cityBtnActive,
                orderBtnActive: false,
                accountBtnActive: false
            });
        }

        if(btn==="my-orders") {
            console.log("Orders button clicked!");
            this.setState({
                cityBtnActive: false,
                orderBtnActive: !this.state.orderBtnActive,
                accountBtnActive: false
            });
        }

        if(btn==="my-account") {
            console.log("Account button clicked!");
            this.setState({
                cityBtnActive: false,
                orderBtnActive: false,
                accountBtnActive: !this.state.accountBtnActive
            });
        }
    }

    render() {
        const {user} = this.props;
        const {points, name} = user.attributes;
        const cityName = user.attributes.region.name;
        const {handleNavBtnClick} = this;

        return (
            <div className="gb-navbar-container">
                <div className="gb-navbar">
                    <div className="gb-navbar-left">
                        <div className="gb-navbar-logo">
                            <img className="gb-navbar-logo-large" width={155} height={30} src="/logo-large.svg"/>

                            <img className="gb-navbar-logo-small" height={40} src="/logo-small.svg"/>
                        </div>
                    </div>

                    <div className="gb-navbar-right">
                        <div className="gb-navbar-points">
                            <div className="gb-navbar-points-text">{points} points</div>
                        </div>

                        <div className="gb-navbar-city">
                            <div className={"gb-navbar-city-button" + cxnames({'-selected':this.state.cityBtnActive})} onClick={handleNavBtnClick.bind(this, "my-city")}>
                                {cityName}
                                <i className="icon-arrow_down"></i>
                            </div>
                        </div>

                        <div className="gb-navbar-orders">
                            <div className={"gb-navbar-orders-button" + cxnames({'-selected':this.state.orderBtnActive})} onClick={handleNavBtnClick.bind(this, "my-orders")}>
                                My Orders
                                <i className="icon-arrow_down"></i>
                            </div>
                        </div>

                        <div className="gb-navbar-account">
                            <div className={"gb-navbar-account-button" + cxnames({'-selected':this.state.accountBtnActive})} onClick={handleNavBtnClick.bind(this, "my-account")}>
                                Hi, {name}
                                <i className="icon-arrow_down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
