import React, {Component, PropTypes} from 'react';
import TransitionGroup from 'react-addons-transition-group';
import cx from 'classnames';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {FormattedNumber} from 'react-intl';

import {OrderStore} from '../../../stores/order';
import {Order} from '../../../models/order';
import {MenuItem} from '../../../models/menu-item';
import {
    RestaurantMenuItemMenuWrapperComponent,
    RestaurantMenuItemMenuComponent
} from './item-menu';

@inject({

}, [RestaurantMenuItemMenuComponent])
export class RestaurantMenuItemComponent extends Component {
    static propTypes = {
        item: PropTypes.instanceOf(MenuItem).isRequired,
        order: PropTypes.instanceOf(Order).isRequired,
        requestOpen: PropTypes.func.isRequired,
        requestClose: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired
    };

    handleOpen = () => {
        this.props.requestOpen(this.props.item.id);
    };

    handleClose = () => {
        this.props.requestClose();
    };

    render() {
        const {item, order, isOpen} = this.props;
        const {
            name,
            tags,
            min_qty,
            price,
            description
        } = item;

        const itemMenu = (
            <RestaurantMenuItemMenuWrapperComponent
                showNoOrderMessage={!order || !order.id}
                order={order}
                item={item}
                onClose={this.handleClose}
            />
        );

        const descEl = (
            <div className="gb-restaurant-menu-item-desc">
                <div className="gb-restaurant-menu-item-desc-text">
                    {description}
                </div>
            </div>
        );

        const cname = cx('gb-restaurant-menu-item', {
            'gb-restaurant-menu-item-open': isOpen
        });

        return (
            <div className={cname} onClick={!isOpen && this.handleOpen}>
                <div className="gb-restaurant-menu-item-heading" onClick={this.handleClose}>
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
                </div>

                {description && descEl}

                <TransitionGroup>{isOpen && itemMenu}</TransitionGroup>
            </div>
        );

        function renderTag(tagObj, index) {
            const {tag} = tagObj;
            return (
                <div className="gb-restaurant-menu-item-tag" key={index}>
                    <DietTagComponent
                        tag={tag}
                    />
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

const dietTags = {
    glutenFree: "gluten-free",
    vegan: "vegan",
    vegetarian: "vegetarian",
    kosher: "kosher",
    halal: "halal",
    dairyFree: "dairy-free",
    nuts: "nuts",
    spicy: "spicy"
};

export class DietTagComponent extends Component {
    static propTypes = {
        tag: PropTypes.string.isRequired
    };

    render() {
        const {tag} = this.props;
        const cname = 'diet-tag diet-tag-' + dietTags[tag];

        return (
            <span className={cname}></span>
        );
    }
}
