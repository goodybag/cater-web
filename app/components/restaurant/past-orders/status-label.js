import React, {Component} from 'react';

export class RestaurantOrdersStatusLabelComponent extends Component {
    static propTypes = {
        status: React.PropTypes.string.isRequired
    }

    displayStatus = (status) => {
        if(status==="pending") {
            return (
                <div className="gb-restaurant-orders-status-label-draft">
                    Draft
                </div>
            );
        } else {
            return (
                <div className={"gb-restaurant-orders-status-label-" + status}>
                    {
                        /* change first letter to upper case */
                        [status.slice(0,1).toUpperCase(), status.slice(1)].join('')
                    }
                </div>
            );
        }
    }

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
