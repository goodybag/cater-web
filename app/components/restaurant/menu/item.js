import React, {Component, PropTypes} from 'react';
import TransitionGroup from 'react-addons-transition-group';
import cx from 'classnames';
import {inject} from 'yokohama';
import {FormattedNumber} from 'react-intl';

import {MenuItem} from '../../../models/menu-item';
import {
    RestaurantMenuItemMenuWrapperComponent,
    RestaurantMenuItemMenuComponent
} from './item-menu';

@inject({}, [RestaurantMenuItemMenuComponent])
export class RestaurantMenuItemComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired
    };

    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        const {open} = this.state;
        const {item} = this.props;
        const {
            name,
            tags,
            min_qty,
            price,
            description
        } = item;

        const itemMenu = (
            <RestaurantMenuItemMenuWrapperComponent
                item={item}
                onClose={this.handleClose}
            />
        );

        const cname = cx('gb-restaurant-menu-item', {
            'gb-restaurant-menu-item-open': open
        });

        return (
            <div className={cname} onClick={!open && this.handleOpen}>
                <div className="gb-restaurant-menu-item-title">
                    <div className="gb-restaurant-menu-item-title-content">
                        {name}
                    </div>
                    <div className="gb-restaurant-menu-item-tags">
                        {tags.map(renderTag)}
                    </div>
                </div>

                <div className="gb-restaurant-menu-item-quantity">
                    {this.renderQuantity()}
                </div>

                <div className="gb-restaurant-menu-item-price">
                    <FormattedNumber
                        value={price / 100}
                        style="currency"
                        currency="USD"
                    />

                    {min_qty ? ' per person' : null}
                </div>

                <div className="gb-restaurant-menu-item-desc">
                    <div className="gb-restaurant-menu-item-desc-text">
                        {description}
                    </div>
                </div>

                <TransitionGroup>{open && itemMenu}</TransitionGroup>
            </div>
        );

        function renderTag(tagName, index) {
            return (
                <div className="gb-restaurant-menu-item-tag" key={index}>
                    {tagName}
                </div>
            );
        }
    }

    renderQuantity() {
        const {item} = this.props;
        const {min_qty, feeds_min, feeds_max} = item;

        if (min_qty !== 0) {
            return `Min. ${min_qty}`;
        } else if (feeds_max > feeds_min) {
            return `Feeds ${feeds_min}-${feeds_max}`;
        } else {
            return `Feeds ${feeds_min}`;
        }
    }
}
