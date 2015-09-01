import React, {Component} from 'react';
import {RestaurantTabTitleComponent} from './tab-title.js';

export class RestaurantTabsComponent extends Component {
    static propTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            body: React.PropTypes.element
        })).isRequired
    }

    state = {
        currentTabIndex : 0
    }

    newTabIndex = (i) => {
        this.setState({currentTabIndex : i});
    }

    render() {
        const {tabs} = this.props;
        const {currentTabIndex} = this.state;
        const {newTabIndex} = this;
        const {displayContent} = this;

        return (
            <div className="gb-restaurant-tabs">
                <div className="gb-restaurant-tabs-container">
                    {tabs.map(function(tab, i) {
                        return <div className="gb-restaurant-tabs-tab-title" onClick={newTabIndex.bind(this,i)} key={i}>
                            <RestaurantTabTitleComponent
                                title={tab.title}
                                active={currentTabIndex===i}
                                key={i}>
                            </RestaurantTabTitleComponent>
                        </div>;
                    })}
                </div>
                <div className="gb-restaurant-tabs-body">
                    {tabs[currentTabIndex].body}
                </div>
            </div>
        );
    }
}
