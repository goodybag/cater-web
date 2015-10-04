import React, {Component, PropTypes} from 'react';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';
import cxnames from 'classnames';

import {CurrentUserStore} from '../../stores/user';
import {CurrentUser} from '../../models/user';
import {NavbarSubbarComponent} from './subbar';

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
            this.setState({
                cityBtnActive: !this.state.cityBtnActive,
                orderBtnActive: false,
                accountBtnActive: false
            });
        }

        if(btn==="my-orders") {
            this.setState({
                cityBtnActive: false,
                orderBtnActive: !this.state.orderBtnActive,
                accountBtnActive: false
            });
        }

        if(btn==="my-account") {
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
        let {cityBtnActive, orderBtnActive, accountBtnActive} = this.state;

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
                            <div className={"gb-navbar-city-button" + cxnames({'-selected':cityBtnActive})} onClick={handleNavBtnClick.bind(this, "my-city")}>
                                {cityName}
                                <i className={cxnames({"icon-arrow_side":!cityBtnActive, "icon-arrow_down":cityBtnActive})}></i>
                            </div>
                        </div>

                        <div className="gb-navbar-orders">
                            <div className={"gb-navbar-orders-button" + cxnames({'-selected':orderBtnActive})} onClick={handleNavBtnClick.bind(this, "my-orders")}>
                                My Orders
                                <i className={cxnames({"icon-arrow_side":!orderBtnActive, "icon-arrow_down":orderBtnActive})}></i>
                            </div>
                        </div>

                        <div className="gb-navbar-account">
                            <div className={"gb-navbar-account-button" + cxnames({'-selected':accountBtnActive})} onClick={handleNavBtnClick.bind(this, "my-account")}>
                                Hi, {name}
                                <i className={cxnames({"icon-arrow_side":!accountBtnActive, "icon-arrow_down":accountBtnActive})}></i>
                            </div>
                        </div>
                    </div>
                </div>
                <NavbarSubbarComponent
                    cityBtnActive={cityBtnActive}
                    orderBtnActive={orderBtnActive}
                    accountBtnActive={accountBtnActive}
                    currentCity={cityName}
                />
            </div>
        );
    }
}
