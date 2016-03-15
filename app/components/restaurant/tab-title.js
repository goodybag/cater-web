import React, {Component} from 'react';
import cx from 'classnames';

export class RestaurantTabTitleComponent extends Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool.isRequired
    };

    orderNotifications = () => {
        // TODO: Enter number of Past Orders here
        return <span className="gb-restaurant-tab-title-order-notifications">3</span>;
    };

    render() {
        const {title} = this.props;
        const {active} = this.props;
        const {orderNotifications} = this;

        var clsNs = cx('gb-restaurant-tab-title', {active});

        return (
            <div className={clsNs}>
                <span>{title}</span>
                {title === 'Orders' && orderNotifications()}
            </div>
        );
    }
}
