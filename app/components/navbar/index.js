import React, {Component, PropTypes, cloneElement} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import cx from 'classnames';
import {urlForAsset} from '../../asset';

import {CurrentUserStore} from '../../stores/user';
import {CurrentUser} from '../../models/user';

import {NavbarRegionMenuComponent} from './menus/region';
import {NavbarOrderMenuComponent} from './menus/order';
import {NavbarAccountMenuComponent} from './menus/account';

@inject({
    currentUserStore: CurrentUserStore
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
        user: PropTypes.instanceOf(CurrentUser)
    }

    state = {
        activeItemName: null,
        isExpanded: false
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
            <div className={cx({
                'gb-navbar': this.state.isExpanded,
                'gb-navbar-collapsed': !this.state.isExpanded,
                'gb-navbar-fixed': true
            })}>
                <div className="gb-container">
                    <div className="gb-navbar-logo-component">
                        <img
                            className="gb-navbar-logo-mobile"
                            src="http://storage.j0.hn/gb-logo-small.svg" />
                        <img
                            className="gb-navbar-logo"
                            src="https://d3bqck8kwfkhx5.cloudfront.net/img/logo.png" />
                    </div>
                    <div className="gb-navbar-caption-component">
                        <span className="gb-navbar-caption-assist"><strong>Let us help you with your order!</strong></span>
                        <span className="gb-navbar-caption-number">(512) 677-4224</span>
                    </div>
                    
                    <div className="gb-navbar-toggle-component">
                        <button
                            className="gb-navbar-toggle"
                            onClick={this.onToggleClick.bind(this)}
                        >
                            <i className="icon-menu" />
                        </button>
                    </div>

                    <a className="gb-navbar-points-component" href="/users/me/rewards">1432</a>
                    <div className="gb-navbar-nav-component">
                        <ul className="nav">
                            <li>
                                <NavbarItemComponent
                                    title={regionName}
                                    name="region"
                                    active={activeItemName === 'region'}
                                    onClick={this.handleItemClick}
                                    items={transition(activeItemName === 'region' && items.region)}
                                />
                            </li>

                            <li>
                                <NavbarItemComponent
                                    title="My Orders"
                                    name="orders"
                                    active={activeItemName === 'orders'}
                                    onClick={this.handleItemClick}
                                    items={transition(activeItemName === 'orders' && items.orders)}
                                />
                            </li>

                            <li>
                                <NavbarItemComponent
                                    title={`Hi, ${name}`}
                                    name="account"
                                    active={activeItemName === 'account'}
                                    onClick={this.handleItemClick}
                                    items={transition(activeItemName === 'account' && items.account)}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );

        return (
            <span>
                <div className="gb-navbar-container">
                    <div className="gb-navbar">
                        <div className="gb-navbar-left">
                            <div className="gb-navbar-logo">
                                <img className="gb-navbar-logo-large" width={155} height={30} src={urlForAsset('logo-large.svg')}/>

                                <img className="gb-navbar-logo-small" height={40} src={urlForAsset('logo-small.svg')}/>
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

    onToggleClick(e) {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
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
