import React, {Component, PropTypes, cloneElement} from 'react';
import {inject} from 'yokohama';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

import {RestaurantMenuSearchboxComponent} from './searchbox';
import {RestaurantMenuTabsComponent} from './tabs';
import {MenuSearchTerm} from '../../../lib/menu-search';

@inject({}, [
    RestaurantMenuSearchboxComponent,
    RestaurantMenuTabsComponent
])
export class RestaurantMenuBarComponent extends Component {
    static propTypes = {
        searchTerm: PropTypes.instanceOf(MenuSearchTerm).isRequired,
        onSearchTermChange: PropTypes.func.isRequired
    };

    render() {
        const {searchTerm, onSearchTermChange} = this.props;

        return (
            <RestaurantMenuBarWrapperComponent>
                <div className="gb-restaurant-menu-bar-content">
                    <RestaurantMenuSearchboxComponent
                        searchTerm={searchTerm}
                        onSearchTermChange={onSearchTermChange}
                    />

                    <RestaurantMenuTabsComponent/>
                </div>
            </RestaurantMenuBarWrapperComponent>
        );
    }
}

export class RestaurantMenuBarWrapperComponent extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    state = {affix: false};

    componentDidMount() {
        const {container, child} = this.refs;
        const containerNode = findDOMNode(container);
        const childNode = findDOMNode(child);

        this.handleScroll = () => {
            const {affix} = this.state;
            const scrollTop = document.body.scrollTop;
            const offset = containerNode.getBoundingClientRect().top;

            if (!affix && offset <= 0) {
                this.setState({affix: true});
            }

            if (affix && offset > 0) {
                this.setState({affix: false});
            }
        };

        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleScroll);
   }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleScroll);
    }

    render() {
        const {children} = this.props;
        const {affix} = this.state;
        const set = cx('gb-restaurant-menu-bar', {
            'gb-restaurant-menu-bar-affix': affix
        });

        return (
            <div ref="container" className="gb-restaurant-menu-bar-container">
                <div ref="child" className={set}>
                    {children}
                </div>
            </div>
        );
    }
}
