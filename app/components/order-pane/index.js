import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';

import {OrderStore} from '../../stores/order';
import {OrderItemStore} from '../../stores/order-item';
import {RestaurantStore} from '../../stores/restaurant';
import {Order} from '../../models/order';
import {OrderItem} from '../../models/order-item';
import {RestaurantHour} from '../../models/restaurant-hour';
import {OrderParams} from '../../models/order-params';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';
import {OrderPaneTimeLeftComponent} from './timeleft';
import {OrderPaneHeaderComponent} from './header';

import {
    OrderPaneEditComponent,
    OrderPaneEditCancelComponent,
    OrderPaneEditSaveComponent
} from './edit';

import {
    SubmitOrderParamsAction,
    UpdateOrderParamsAction
} from '../../actions/order';

@inject({
    orderStore: OrderStore,
    orderItemStore: OrderItemStore,
    restaurantStore: RestaurantStore,
    dispatcher: Dispatcher
}, [OrderPaneInfoComponent, OrderPaneItemsComponent, OrderPaneShareComponent])
@listeningTo(['orderStore', 'orderItemStore', 'restaurantStore'], props => {
    const {orderStore, orderItemStore, restaurantStore} = props;

    return {
        order: orderStore.getOrder(),
        orderItems: orderItemStore.getOrderItems(),
        restaurantHours: restaurantStore.getRestaurantHours()
    };
})
export class OrderPaneComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order),
        orderStore: PropTypes.instanceOf(OrderStore).isRequired,
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem)),
        restaurantHours: PropTypes.arrayOf(PropTypes.instanceOf(RestaurantHour)).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
    };

    constructor(props) {
        super(props);

        const {order} = props;

        this.state = {
            saving: false,
            editorError: null,
            editorOrderParams: order ? null : new OrderParams()
        };

        this.startEditing = this.startEditing.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.handleSaveOrderParams = this.handleSaveOrderParams.bind(this);
        this.handleOrderSubmission = this.handleOrderSubmission.bind(this);
        this.handleOrderParamsChange = this.handleOrderParamsChange.bind(this);
    }

    startEditing() {
        const {order} = this.props;

        this.setState({
            editorOrderParams: OrderParams.fromOrder(order)
        });
    }

    stopEditing() {
        this.setState({editorOrderParams: null});
    }

    handleOrderParamsChange(editorOrderParams) {
        this.setState({editorOrderParams, editorError: null});
    }

    handleSaveOrderParams() {
        const {dispatcher, order} = this.props;
        const {editorOrderParams} = this.state;

        const action = new UpdateOrderParamsAction({
            orderId: order.id,
            params: editorOrderParams
        });

        this.whileSaving(() => {
            return dispatcher.dispatch(action).then(() => {
                this.setState({editorOrderParams: null});
            }, editorError => {
                this.setState({editorError});
            });
        });
    }

    handleOrderSubmission(info) {
        const {dispatcher} = this.props;
        const {editorOrderParams} = this.state;

        const action = new SubmitOrderParamsAction({
            params: editorOrderParams
        });

        this.whileSaving(() => {
            return dispatcher.dispatch(action).then(() => {
                this.setState({
                    editorOrderParams: null,
                    editorError: null
                });
            }, editorError => {
                this.setState({editorError});
            });
        });
    }

    whileSaving(block) {
        this.setState({saving: true}, () => {
            block().finally(() => {
                this.setState({saving: false});
            });
        });
    }

    render() {
        const {
            order,
            orderItems,
            dispatcher,
            restaurantHours,
            orderStore
        } = this.props;

        const {
            saving,
            editorOrderParams,
            editorError
        } = this.state;

        const orderCreatorDisplay = editorOrderParams && (
            <OrderPaneEditComponent
                saving={saving}
                orderParams={editorOrderParams}
                error={editorError}
                onChange={this.handleOrderParamsChange}
                restaurantHours={restaurantHours}

                saveButton={
                    <OrderPaneEditSaveComponent
                        onClick={this.handleOrderSubmission}
                    />
                }
            />
        );

        const orderEditorDisplay = order && editorOrderParams && (
            <OrderPaneEditComponent
                saving={saving}
                orderParams={editorOrderParams}
                error={editorError}
                onChange={this.handleOrderParamsChange}
                restaurantHours={restaurantHours}

                saveButton={
                    <OrderPaneEditSaveComponent
                        onClick={this.handleSaveOrderParams}
                    />
                }

                cancelButton={
                    <OrderPaneEditCancelComponent
                        onClick={this.stopEditing}
                    />
                }
            />
        );

        const orderInfoDisplay = order && (
            <OrderPaneInfoComponent
                order={order}
                onStartEditing={this.startEditing}
            />
        );

        const orderDisplay = orderEditorDisplay
            || orderInfoDisplay
            || orderCreatorDisplay;

        const orderSharing = order && (
            <OrderPaneShareComponent order={order}/>
        );

        const orderItemsDisplay = order && (
            <OrderPaneItemsComponent
                order={order}
                orderItems={orderItems}
                dispatcher={dispatcher}
            />
        );

        const orderTimeLeftSection = order && (
            <OrderPaneTimeLeftComponent
                order={order}
            />
        );

        const orderDisplaySection = (
            <OrderPaneHeaderComponent
                title={order ? `Order - #${order.id}` : 'Order'}
                children={orderDisplay}
            />
        );

        const orderSharingSection = order && (
            <OrderPaneHeaderComponent
                title="Share Order (Optional)"
                initiallyOpen={false}
                children={orderSharing}
            />
        );

        const orderItemsDisplaySection = order && (
            <OrderPaneHeaderComponent
                title="Order Items"
                children={orderItemsDisplay}
            />
        );

        return (
            <div className="gb-order-pane">
                {orderTimeLeftSection}
                {orderDisplaySection}
                {orderSharingSection}
                {orderItemsDisplaySection}
            </div>
        );
    }
}
