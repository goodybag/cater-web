import React, {Component} from 'react';

export class StarsComponent extends Component {
    static propTypes = {
        rating: React.PropTypes.number.isRequired
    };

    render() {
        const {rating} = this.props;

        const stars = [1, 2, 3, 4, 5].map(renderValue);

        return (
            <div className="gb-stars">{stars}</div>
        );

        function renderValue(value) {
            if (value <= rating) {
                if (value - 0.5 === rating) {
                    return <div key={value} className="gb-stars-half"/>;
                } else {
                    return <div key={value} className="gb-stars-full"/>;
                }
            } else {
                return <div key={value} className="gb-stars-empty"/>;
            }
        }
    }
}
