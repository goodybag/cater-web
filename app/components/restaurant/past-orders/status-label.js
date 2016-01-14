import React, {Component} from 'react';

export class RestaurantOrdersStatusLabelComponent extends Component {
    static propTypes = {
        status: React.PropTypes.string.isRequired
    };

    displayStatus = (status) => {
        if(status==="pending") {
            return (
                <div className="gb-restaurant-orders-status-label-draft">
                    Draft
                </div>
            );
        } else {
            return (
                <div className={`gb-restaurant-orders-status-label-${status}`}>
                    {status}
                </div>
            );
        }
    };

    render() {
        const {status} = this.props;
        const {displayStatus} = this;

        return (
            <div className="gb-restaurant-orders-status-label">
                {displayStatus(status)}
            </div>
        );
    }
}
