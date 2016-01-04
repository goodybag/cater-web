import React, {Component, PropTypes, cloneElement} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import cx from 'classnames';

import {Config} from '../../lib/config';
import {CurrentUserStore} from '../../stores/user';
import {User} from '../../models/user';

import {NavbarRegionMenuComponent} from './menus/region';
import {NavbarOrderMenuComponent} from './menus/order';
import {NavbarAccountMenuComponent} from './menus/account';

@inject({
    currentUserStore: CurrentUserStore,
    config: Config
}, [
    NavbarRegionMenuComponent,
    NavbarOrderMenuComponent,
    NavbarAccountMenuComponent
])
@listeningTo([CurrentUserStore], props => {
    const {currentUserStore} = props;

    return {
        user: currentUserStore.getUser()
    };
})
export class NavbarComponent extends Component {
    static propTypes = {
        user: PropTypes.instanceOf(User),
        config: PropTypes.instanceOf(Config)
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
        const {user, config} = this.props;
        const {points, name, region: {name: regionName}} = user;
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
                                <img className="gb-navbar-logo-large" width={155} height={30} src={config.resolveAssetURL('logo-large.svg')}/>

                                <img className="gb-navbar-logo-small" height={40} src={config.resolveAssetURL('logo-small.svg')}/>
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
                                items={transition(activeItemName === 'region' && items.region)}
                            />

                            <NavbarItemComponent
                                title="My Orders"
                                name="orders"
                                active={activeItemName === 'orders'}
                                onClick={this.handleItemClick}
                                items={transition(activeItemName === 'orders' && items.orders)}
                            />

                            <NavbarItemComponent
                                title={`Hi, ${name}`}
                                name="account"
                                active={activeItemName === 'account'}
                                onClick={this.handleItemClick}
                                items={transition(activeItemName === 'account' && items.account)}
                            />
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
        onClick: PropTypes.func.isRequired,
        items: PropTypes.node.isRequired
    }

    handleClick = () => {
        const {name, onClick} = this.props;

        onClick(name);
    }

    render() {
        const {title, name, active, items} = this.props;

        const set = cx(`gb-navbar-item-${name}`, {active});

        return (
            <div className="gb-navbar-button" onClick={this.handleClick}>
                <div className={set}>
                    {title}

                    <div className="gb-navbar-item-arrow">
                        <div className={active ? 'gb-arrow-down' : 'gb-arrow-right'}/>
                    </div>
                </div>

                {items}
            </div>
        );
    }

    // <i className={cxnames({"icon-arrow_side":!accountBtnActive, "icon-arrow_down":accountBtnActive})}></i>
}
