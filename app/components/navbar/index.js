import React, {Component, PropTypes, cloneElement} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {dependencies} from 'yokohama';
import {listeningTo} from 'tokyo';
import cx from 'classnames';

import {CurrentUserStore} from '../../stores/user';
import {CurrentUser} from '../../models/user';

import {NavbarRegionMenuComponent} from './menus/region';
import {NavbarOrderMenuComponent} from './menus/order';
import {NavbarAccountMenuComponent} from './menus/account';

@dependencies({
    currentUserStore: CurrentUserStore
}, [
    NavbarRegionMenuComponent,
    NavbarOrderMenuComponent,
    NavbarAccountMenuComponent
])
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
        activeItemName: null
    }

    handleItemClick = itemName => {
        const {activeItemName} = this.state;

        if (itemName === activeItemName) {
            this.setState({activeItemName: null});
        } else {
            this.setState({activeItemName: itemName});
        }
    }

    render() {
        const {user} = this.props;
        const {points, name, region: {name: regionName}} = user.attributes;
        const {activeItemName} = this.state;

        const items = {
            region: <NavbarRegionMenuComponent key="region"/>,
            orders: <NavbarOrderMenuComponent key="orders"/>,
            account: <NavbarAccountMenuComponent key="account"/>
        };

        // TODO: make this into an iterating array thingy

        return (
            <span>
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

                            <NavbarItemComponent
                                title={regionName}
                                name="region"
                                active={activeItemName === 'region'}
                                onClick={this.handleItemClick}
                            />

                            {transition(activeItemName === 'region' && items.region)}

                            <NavbarItemComponent
                                title="My Orders"
                                name="orders"
                                active={activeItemName === 'orders'}
                                onClick={this.handleItemClick}
                            />

                            {transition(activeItemName === 'orders' && items.orders)}

                            <NavbarItemComponent
                                title={`Hi, ${name}`}
                                name="account"
                                active={activeItemName === 'account'}
                                onClick={this.handleItemClick}
                            />

                            {transition(activeItemName === 'account' && items.account)}
                        </div>
                    </div>
                </div>

                {transition(items[activeItemName])}
            </span>
        );

        function transition(el) {
            return (
                <CSSTransitionGroup
                    transitionName="gb-navbar-menu"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {el}
                </CSSTransitionGroup>
            );
        }
    }
}

class NavbarItemComponent extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    }

    handleClick = () => {
        const {name, onClick} = this.props;

        onClick(name);
    }

    render() {
        const {title, name, active} = this.props;

        const set = cx(`gb-navbar-item-${name}`, {active});

        return (
            <div className={set} onClick={this.handleClick}>
                {title}

                <div className="gb-navbar-item-arrow">
                    <div className={active ? 'gb-arrow-down' : 'gb-arrow-right'}/>
                </div>
            </div>
        );
    }

    // <i className={cxnames({"icon-arrow_side":!accountBtnActive, "icon-arrow_down":accountBtnActive})}></i>
}