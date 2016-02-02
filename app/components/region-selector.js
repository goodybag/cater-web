import React, {Component, PropTypes} from 'react';
import {Dispatcher} from 'flux';
import {find} from 'lodash';

import {UpdateUserRegionAction} from '../actions/user';
import {Region} from '../models/region';

export class RegionSelectorComponent extends Component {
    static propTypes = {
        value: PropTypes.number.isRequired,
        regions: PropTypes.arrayOf(PropTypes.instanceOf(Region)).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
        className: PropTypes.string.isRequired,
        childClassName: PropTypes.string.isRequired
    };

    static defaultProps = {
        regions: [
            new Region({id: 1, name: 'Austin, TX'}),
            new Region({id: 2, name: 'None'}),
            new Region({id: 3, name: 'Houston, TX'}),
            new Region({id: 4, name: 'Seattle, WA'}),
            new Region({id: 5, name: 'Nashville, TN'})
        ],
        className: 'gb-region-selector',
        childClassName: 'gb-region-selector-choice'
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {dispatcher, regions} = this.props;

        const id = +event.target.value;

        dispatcher.dispatch(new UpdateUserRegionAction(find(regions, {id})));
    }

    render() {
        const {value, regions, className, childClassName} = this.props;

        const options = regions.map((region) => {
            return (
                <option className={childClassName} key={region.id} value={region.id}>
                    {region.name}
                </option>
            );
        });

        return (
            <select className={className} value={value} onChange={this.handleChange}>
                {options}
            </select>
        );
    }
}
