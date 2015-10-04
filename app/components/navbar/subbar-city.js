import React, {Component, PropTypes} from 'react';
import cxnames from 'classnames';

export class NavbarSubbarCityComponent extends Component {
    static propTypes = {
        currentCity: PropTypes.string.isRequired
    }

    render() {
        const {currentCity} = this.props;
        // TODO: Render this array live
        const cityNames = ["Austin, TX", "Houston, TX", "Nashville, TN", "Seattle, WA", "None"];


        return (
            <div className="gb-navbar-subbar-city">
                {cityNames.map(renderCities)}
            </div>
        );

        function renderCities(cityName, i) {
            const selected = currentCity === cityName;

            return (
                <div className={"gb-navbar-subbar-city-option" + cxnames({"-selected":selected})} key={i}>
                    {cityName}
                </div>
            );
        }
    }
}
