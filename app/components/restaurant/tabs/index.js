import React, {Component} from 'react';
import {RestaurantTabTitleComponent} from './title';

export class RestaurantTabsComponent extends Component {
    static propTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.node.isRequired,
            body: React.PropTypes.node.isRequired
        })).isRequired,
        currentTabIndex: React.PropTypes.number.isRequired,
        onNewTabIndex: React.PropTypes.func.isRequired
    }

    render() {
        const {onNewTabIndex: newTabIndex, tabs, currentTabIndex} = this.props;

        return (
            <div className="gb-restaurant-tabs">
                {tabs.map(renderTab)}
            </div>
        );

        function renderTab(tab, index) {
            return (
                <RestaurantTabTitleComponent
                    title={tab.title}
                    active={currentTabIndex === index}
                    index={index}
                    key={index}
                    onClick={newTabIndex}
                />
            );
        }
    }
}
