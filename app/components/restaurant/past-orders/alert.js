import React, {Component} from 'react';

export class RestaurantOrdersAlertComponent extends Component {
    static propTypes = {
        message: React.PropTypes.string.isRequired
    }

    render() {
        const {message} = this.props;

        return (
            <div className="gb-restaurant-orders-alert">
                {message}
                <a href="#">
                    Undo
                </a>
            </div>
        );
    }
}
