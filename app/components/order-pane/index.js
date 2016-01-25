import React, {Component, PropTypes} from 'react';
import {inject} from 'yokohama';
import {listeningTo} from 'tokyo';
import {Dispatcher} from 'flux';
import cx from 'classnames';

import {OrderStore} from '../../stores/order';
import {OrderItemStore} from '../../stores/order-item';
import {Order} from '../../models/order';
import {OrderItem} from '../../models/order-item';
import {OrderPaneInfoComponent} from './info';
import {OrderPaneEditComponent} from './edit';
import {OrderPaneShareComponent} from './share';
import {OrderPaneItemsComponent} from './items';
import {OrderPaneTimeLeftComponent} from './timeleft';
import {SubmitOrderInfoAction, UpdateOrderInfoAction} from '../../actions/order';

@inject({
    orderStore: OrderStore,
    orderItemStore: OrderItemStore,
    dispatcher: Dispatcher
}, [OrderPaneInfoComponent, OrderPaneItemsComponent])
@listeningTo(['orderStore', 'orderItemStore'], props => {
    const {orderStore, orderItemStore} = props;

    return {
        order: orderStore.getOrder(),
        savingOrder: orderStore.isSaving(),
        orderItems: orderItemStore.getOrderItems()
    };
})
export class OrderPaneComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order),
        orderStore: PropTypes.instanceOf(OrderStore).isRequired,
        savingOrder: PropTypes.bool.isRequired,
        orderItems: PropTypes.arrayOf(PropTypes.instanceOf(OrderItem)),
        dispatcher: PropTypes.instanceOf(Dispatcher).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };

        this.handleStartEditing = this.handleStartEditing.bind(this);
        this.handleSaveOrderInfo = this.handleSaveOrderInfo.bind(this);
        this.handleOrderSubmission = this.handleOrderSubmission.bind(this);
    }

    handleStartEditing() {
        this.setState({editing: true});
    }

    handleSaveOrderInfo(changes) {
        const {dispatcher} = this.props;

        this.setState({editing: false});
        dispatcher.dispatch(new UpdateOrderInfoAction({changes}));
    }

    handleOrderSubmission(info) {
        const {dispatcher} = this.props;

        dispatcher.dispatch(new SubmitOrderInfoAction({info}));
    }

    render() {
        const {order, orderItems} = this.props;

        if (order == null) {
            return this.renderEmpty();
        } else {
            return this.renderOrder();
        }
    }

    renderOrderInfo() {
        const {order, savingOrder, orderStore} = this.props;
        const {editing} = this.state;

        if (savingOrder || editing) {
            return (
                <OrderPaneEditComponent
                    order={order}
                    orderStore={orderStore}
                    saving={savingOrder}
                    onSaveInfo={this.handleSaveOrderInfo}
                />
            );
        } else {
            return (
                <OrderPaneInfoComponent
                    order={order}
                    onStartEditing={this.handleStartEditing}
                />
            );
        }
    }

    renderOrder() {
        const {order, orderItems} = this.props;
        const {editing} = this.state;

        return (
            <div className="gb-order-pane">
                <OrderPaneTimeLeftComponent order={order}/>

                <div className="gb-order-pane-tablet-left">
                    <OrderPaneHeaderComponent title={`Order - #${order.id}`}>
                        {this.renderOrderInfo()}
                    </OrderPaneHeaderComponent>

                    <OrderPaneHeaderComponent
                        title="Share Order (Optional)"
                        defaultClosed>

                        <OrderPaneShareComponent order={order}/>
                    </OrderPaneHeaderComponent>
                </div>

                <div className="gb-order-pane-tablet-right">
                    <OrderPaneHeaderComponent title="Order Items">
                        <OrderPaneItemsComponent
                            order={order}
                            orderItems={orderItems}
                        />
                    </OrderPaneHeaderComponent>
                </div>

                <div className="gb-order-pane-endcap"/>
            </div>
        );
    }

    renderEmpty() {
        const {orderStore, savingOrder} = this.props;

        return (
            <div className="gb-order-pane">
                <div className="gb-order-pane-tablet-left">
                    <OrderPaneHeaderComponent title="Order Info">
                        <OrderPaneEditComponent
                            orderStore={orderStore}
                            saving={savingOrder}
                            onSaveInfo={this.handleOrderSubmission}
                        />
                    </OrderPaneHeaderComponent>

                    <OrderPaneHeaderComponent
                        title="Share Order (Optional)"
                        initiallyClosed>

                        <OrderPaneShareComponent disabled/>
                    </OrderPaneHeaderComponent>
               </div>

                <div className="gb-order-pane-tablet-right">
                    <OrderPaneHeaderComponent title="Order Items"/>
                </div>

                <div className="gb-order-pane-endcap"/>
            </div>
        );
    }
}

class OrderPaneHeaderComponent extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node,
        defaultClosed: PropTypes.bool.isRequired
    };

    static defaultProps = {
        defaultClosed: false
    };

    constructor(props) {
        super(props);

        const {defaultClosed} = this.props;

        this.state = {
            open: !defaultClosed
        };
    }

    handleClick = () => {
        this.setState(({open}) => {
            return {open: !open};
        });
    };

    render() {
        const {open} = this.state;
        const {title, children} = this.props;

        const set = cx('gb-order-pane-header', {
            'gb-order-pane-header-closed': !open
        });

        return (
            <div className="gb-order-pane-block">
                <div className={set} onClick={this.handleClick}>
                    <div className="gb-order-pane-header-text">
                        {title}
                    </div>

                    <div className="gb-order-pane-header-arrow">
                        <div className="gb-arrow-down"/>
                    </div>
                </div>

                {children}
            </div>
        );
    }
}
