import React, {Component} from 'react';

export class RestaurantInfoSectionComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    render() {
        const {children} = this.props;

        return (
            <div className="gb-restaurant-info-section">
                {children}
            </div>
        );
    }
}
