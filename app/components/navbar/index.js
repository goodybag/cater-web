import React, {Component, PropTypes, cloneElement} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {Dispatcher} from 'flux';
import cx from 'classnames';

import {Config} from '../../lib/config';
import {CurrentUserStore} from '../../stores/user';
import {User} from '../../models/user';

import {RegionSelectorComponent} from '../region-selector';
import {NavbarOrderMenuComponent} from './menus/order';
import {NavbarAccountMenuComponent} from './menus/account';

@inject({
    currentUserStore: CurrentUserStore,
    config: Config,
    dispatcher: Dispatcher
}, [
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
        config: PropTypes.instanceOf(Config),
        dispatcher: PropTypes.instanceOf(Dispatcher)
    };

    state = {
        activeItemName: null,
        isExpanded: false
    };

    handleItemClick = itemName => {
        const {activeItemName} = this.state;

        if (itemName === activeItemName) {
            this.setState({activeItemName: null});
        } else {
            this.setState({activeItemName: itemName});
        }
    };

    render() {
        const {user, config, dispatcher} = this.props;
        const {points, name, region: {name: regionName}} = user;
        const {activeItemName} = this.state;

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
                            src={config.resolveAssetURL('logo-small.svg')} />
                        <img
                            className="gb-navbar-logo"
                            src={config.resolveAssetURL('logo-large.svg')} />
                    </div>
                    <div className="gb-navbar-caption-component">
                        <span className="gb-navbar-caption-assist"><strong>Let us help you with your order!</strong></span>
                        <span className="gb-navbar-caption-number">(512) 677-4224</span>
                    </div>

                    <div className="gb-navbar-toggle-component">
                        <button
                            className="gb-navbar-toggle gb-icon-hamburger"
                            onClick={this.onToggleClick.bind(this)}
                        >
                        </button>
                    </div>

                    <a className="gb-navbar-points-component" href="/users/me/rewards">1432</a>
                    <div className="gb-navbar-nav-component">
                        <ul className="nav">
                            {user.isAdmin() ? (
                                <li>
                                    <RegionSelectorComponent
                                        value={user.region.id}
                                        dispatcher={dispatcher}
                                    />
                                </li>
                            ) : null}

                            <li>
                                <NavbarItemComponent
                                    title="My Orders"
                                    name="orders"
                                    active={activeItemName === 'orders'}
                                    onClick={this.handleItemClick}
                                >
                                    <NavbarOrderMenuComponent
                                        key="orders"
                                        active={activeItemName === 'orders'}
                                    />
                                </NavbarItemComponent>
                            </li>

                            <li>
                                <NavbarItemComponent
                                    title={`Hi, ${name}`}
                                    name="account"
                                    active={activeItemName === 'account'}
                                    onClick={this.handleItemClick}
                                >
                                    <NavbarAccountMenuComponent
                                        key="account"
                                        active={activeItemName === 'account'}
                                    />
                                </NavbarItemComponent>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
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
        onClick: PropTypes.func.isRequired
    };

    handleClick = () => {
        const {name, onClick} = this.props;

        onClick(name);
    };

    render() {
        const {title, name, active } = this.props;

        return (
            <div className={(cx({
                'gb-navbar-button': true,
                'gb-navbar-button-stay-collapsed': this.props.staysCollapsed,
                'active': active
            }))} onClick={this.handleClick}>
                <div className="gb-navbar-item">
                    <div className="gb-navbar-item-text">
                        {title}
                    </div>

                    <div className="gb-navbar-item-arrow">
                        <div className="gb-arrow-right"/>
                    </div>
                </div>

                {this.props.children}
            </div>
        );
    }

    // <i className={cxnames({"icon-arrow_side":!accountBtnActive, "icon-arrow_down":accountBtnActive})}></i>
}
