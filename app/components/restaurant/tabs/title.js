import React, {Component} from 'react';
import cx from 'classnames';

export class RestaurantTabTitleComponent extends Component {
    static propTypes = {
        title: React.PropTypes.node.isRequired,
        active: React.PropTypes.bool.isRequired,

        // nullable because reusability
        onClick: React.PropTypes.func,
        index: React.PropTypes.number
    }

    handleClick = () => {
        const {onClick, index} = this.props;

        onClick && onClick(index);
    }

    render() {
        const {title, active} = this.props;

        const names = cx('gb-restaurant-tab-title', {active});

        return (
            <div className={names} onClick={this.handleClick}>
                <div className="gb-restaurant-tab-title-content">{title}</div>

                {active && <RestaurantTabArrowComponent/>}
            </div>
        );
    }
}

class RestaurantTabArrowComponent extends Component {
    render() {
        return (
            <div className="gb-restaurant-tab-arrow-container">
                <div className="gb-restaurant-tab-arrow-stroke"/>
                <div className="gb-restaurant-tab-arrow-fill"/>
            </div>
        );
    }
}
