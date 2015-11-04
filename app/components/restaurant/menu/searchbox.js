import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {bind, debounce} from 'lodash-decorators';
import {listeningTo} from 'tokyo';
import {dependencies} from 'yokohama';
import {Dispatcher} from 'flux';

import {UpdateMenuSearchAction} from '../../../actions/menu';

@inject({
    dispatcher: Dispatcher
})
export class RestaurantMenuSearchboxComponent extends Component {
    static propTypes = {
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired
    }

    state = {queryText: ''}

    @debounce(1000)
    runSearch(text) {
        const {dispatcher} = this.props;

        dispatcher.dispatch(new UpdateMenuSearchAction(text));
    }

    @bind()
    handleChange(event) {
        const {value: queryText} = event.target;

        this.setState({queryText});

        this.runSearch(queryText);
    }

    render() {
        const {queryText} = this.state;

        return (
            <div className="gb-restaurant-menu-searchbox">
                <input
                    value={queryText}
                    placeholder="Search menu"
                    type="text"
                    onChange={this.handleChange}
                />

                <div className="gb-search"/>
            </div>
        );
    }
}
