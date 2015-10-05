import React, {Component} from 'react';

export class RestaurantOrdersAlertComponent extends Component {
    static propTypes = {
        message: React.PropTypes.string.isRequired,
        initAlertState: React.PropTypes.bool.isRequired,
        signalAlertClose: React.PropTypes.func.isRequired
    }

    state = {
        alertOpen: this.props.initAlertState
    }

    onLinkClicked = () => {
        this.setState({
            alertOpen: false
        });
        this.props.signalAlertClose();
    }

    render() {
        const {message} = this.props;
        const {onLinkClicked} = this;

        return (
            <div className="gb-restaurant-orders-alert">
                {message}
                <a href="/restaurants/111/orders" onClick={onLinkClicked.bind(this)}>
                    Undo
                </a>
            </div>
        );
    }
}
