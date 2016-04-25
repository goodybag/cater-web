import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {Dispatcher, listeningTo} from 'tokyo';
import {ValidationResultError} from 'nagoya';

import {OrderStore} from '../../stores/order';
import {OrderItemStore} from '../../stores/order-item';
import {RestaurantStore} from '../../stores/restaurant';
import {TimeKeeperStore} from '../../stores/time-keeper';
import {Order} from '../../models/order';
import {OrderItem} from '../../models/order-item';
import {RestaurantHour} from '../../models/restaurant-hour';
import {OrderParams} from '../../models/order-params';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';
import {OrderPaneTimeLeftComponent} from './timeleft';
import {OrderPaneHeaderComponent} from './header';
import {OrderParamsValidator} from '../../validators/order-params';

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
    timeKeeperStore: TimeKeeperStore,
    orderParamsValidator: OrderParamsValidator,
    dispatcher: Dispatcher
}, [OrderPaneInfoComponent, OrderPaneItemsComponent, OrderPaneShareComponent])
@listeningTo(['orderStore', 'orderItemStore', 'restaurantStore'], props => {
    const {
        orderStore,
        orderItemStore,
        restaurantStore,
        timeKeeperStore
    } = props;

    return {
        order: orderStore.getOrder(),
        orderItems: orderItemStore.getOrderItems(),
        restaurantHours: restaurantStore.getRestaurantHours(),
        now: timeKeeperStore.getCurrentTime()
    };
})
export class OrderPaneComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order),
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem)),
        restaurantHours: PropTypes.arrayOf(PropTypes.instanceOf(RestaurantHour)).isRequired,
        now: PropTypes.instanceOf(Date).isRequired,
        orderParamsValidator: PropTypes.instanceOf(OrderParamsValidator).isRequired,
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
    };

    constructor(props) {
        super(props);

        const {order} = props;

        this.state = {
            saving: false,
            editing: false,
            savingError: null,
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
            editing: true
        });
    }

    stopEditing() {
        this.setState({
            editing: false,
            editorOrderParams: null
        });
    }

    handleOrderParamsChange(editorOrderParams) {
        this.setState({
            editorOrderParams,
            savingError: null,
            editing: true
        });
    }

    handleSaveOrderParams() {
        const {dispatcher, order} = this.props;
        const editorOrderParams = this.getEditorOrderParams();

        const action = new UpdateOrderParamsAction({
            orderId: order.id,
            params: editorOrderParams
        });

        this.whileSaving(() => {
            return dispatcher.dispatch(action).then(() => {
                this.setState({
                    editing: false,
                    editorOrderParams: null
                });
            });
        });
    }

    handleOrderSubmission(info) {
        const {dispatcher} = this.props;
        const editorOrderParams = this.getEditorOrderParams();

        const action = new SubmitOrderParamsAction({
            params: editorOrderParams
        });

        this.whileSaving(() => {
            return dispatcher.dispatch(action).then(() => {
                this.setState({
                    editorOrderParams: null,
                    editing: false
                });
            });
        });
    }

    whileSaving(block) {
        this.setState({saving: true}, () => {
            block().catch(ValidationResultError, err => {
                this.setState({savingError: err});
            }).finally(() => {
                this.setState({saving: false});
            });
        });
    }

    getParamsValidationError() {
        const {orderParamsValidator, order, now} = this.props;

        const {editorOrderParams} = this.state;

        return editorOrderParams ? (
            orderParamsValidator.schema(editorOrderParams).error()
        ) : (
            order && orderParamsValidator.deadlineSchema(order, now).error()
        );
    }

    getEditorOrderParams() {
        const {order} = this.props;

        const {editorOrderParams} = this.state;

        return editorOrderParams || (
            order && OrderParams.fromOrder(order)
        );
    }

    render() {
        const {
            order,
            orderItems,
            dispatcher,
            restaurantHours,
            now
        } = this.props;

        const {
            saving,
            editing,
            savingError
        } = this.state;

        const editorOrderParams = this.getEditorOrderParams();

        const paramsValidationError = this.getParamsValidationError();

        const editorError = savingError || paramsValidationError;

        const orderCreatorDisplay = (
            <OrderPaneEditComponent
                saving={saving}
                orderParams={editorOrderParams}
                error={savingError}
                onChange={this.handleOrderParamsChange}
                restaurantHours={restaurantHours}

                saveButton={
                    <OrderPaneEditSaveComponent
                        onClick={this.handleOrderSubmission}
                        children="Start Order"
                    />
                }
            />
        );

        const orderEditorDisplay = order && (editing || editorError) && (
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
                    !editorError && <OrderPaneEditCancelComponent
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
                now={now}
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
