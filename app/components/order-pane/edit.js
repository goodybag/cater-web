import React, {Component, PropTypes} from 'react';
import {DatePickerComponent, TimePickerComponent} from '@goodybag/react-pickadate';
import cx from 'classnames';
import moment from 'moment-timezone';
import {ValidationError} from 'nagoya';
import {chain} from 'lodash';
import {listeningTo} from 'tokyo';

import {Order} from '../../models/order';
import {validate} from '../../validators/order-info';

@listeningTo(['orderStore'], {
    error: (props, error, component) => {
        if (error instanceof ValidationError) {
            component.setState({columnErrors: error.columns});
        }
    }
})
export class OrderPaneEditComponent extends Component {
    static propTypes = {
        order: PropTypes.instanceOf(Order),
        saving: PropTypes.bool.isRequired,
        onSaveInfo: PropTypes.func.isRequired,
        onCancel: PropTypes.func
    };

    static defaultProps = {
        saving: false
    };

    constructor(props) {
        super(props);

        const {
            order = null
        } = this.props;

        if (order == null) {
            this.state = {
                columnErrors: {},
                address: null,
                guests: null,
                date: null,
                time: null
            };
        } else {
            const datetime = moment(order.datetime).toDate();

            this.state = {
                columnErrors: {},
                address: order.displayAddress(),
                guests: order.guests,
                date: moment(datetime).format('YYYY-MM-DD'),
                time: moment(datetime).format('HH:mm:ss')
            };
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSaveInfo = this.handleSaveInfo.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleGuestsChange = this.handleGuestsChange.bind(this);
        this.validateFields = this.validateFields.bind(this);
    }

    isCancellable() {
        const {onCancel} = this.props;

        return onCancel != null;
    }

    handleCancel() {
        const {onCancel} = this.props;

        onCancel();
    }

    handleSaveInfo() {
        const {onSaveInfo: saveInfo} = this.props;
        const {address, guests, date, time} = this.state;

        saveInfo({address, guests, date, time});
    }

    handleAddressChange(event) {
        const {target: {value}} = event;

        this.setState({address: value || null});
        this.validateFields();
    }

    handleDateChange(date) {
        this.setState({date});
        this.validateFields();
    }

    handleTimeChange(time) {
        this.setState({time});
        this.validateFields();
    }

    handleGuestsChange(event) {
        const {target: {value}} = event;

        this.setState({guests: +value});
        this.validateFields();
    }

    inputBoxClassNameByValidity(state, show = false) {
        return cx('gb-order-pane-edit-box', {
            'gb-order-pane-edit-box-valid': state === 'valid',
            'gb-order-pane-edit-box-invalid': state === 'invalid',
            'gb-order-pane-edit-box-invalid-show': show
        });
    }

    classNameForColumn(columnName, value) {
        const {columnErrors} = this.state;

        if (columnErrors[columnName]) {
            return this.inputBoxClassNameByValidity('invalid',
                                                    this.shouldShowColumn(columnName));
        } else if (value == null) {
            return this.inputBoxClassNameByValidity();
        } else {
            return this.inputBoxClassNameByValidity('valid');
        }
    }

    shouldShowColumn(columnName) {
        const {columnErrors} = this.state;

        const errors = [
            {name: 'address', value: columnErrors.address},
            {name: 'date', value: columnErrors.date},
            {name: 'time', value: columnErrors.time},
            {name: 'guests', value: columnErrors.guests},
        ];

        const result = chain(errors)
            .filter('value')
            .pluck('name')
            .head()
            .value();

        return result === columnName;
    }

    validateFields() {
        const {address, date, time, guests} = this.state;

        let columnErrors = {};

        try {
            validate({address, date, time, guests});
        } catch (err) {
            if (err instanceof ValidationError) {
                columnErrors = err.columns;
            } else {
                throw err;
            }
        }

        this.setState({columnErrors});
    }

    render() {
        const {saving} = this.props;
        const {address, guests, date, time} = this.state;

        const cancelButton = (
            <div className="gb-order-pane-edit-cancel"
                onClick={this.handleCancel}
                children="Cancel"
            />
        );

        const saveOrderInfoSet = cx('gb-order-pane-edit-save', {
            'gb-order-pane-edit-save-loading': saving
        });

        return (
            <div className="gb-order-pane-edit">
                <div className="gb-order-pane-edit-location">
                    <div className="gb-order-pane-edit-text">
                        Full address (street, city, state, zip)
                    </div>

                    <div className="gb-order-pane-edit-input">
                        <i className="icon-locationpin"></i>

                        <input
                            disabled={saving}
                            type="text"
                            value={address}
                            onChange={this.handleAddressChange}
                            className={this.classNameForColumn('address', address)}
                        />

                        <div className="gb-order-pane-edit-checkmark"/>
                        <div className="gb-order-pane-edit-crossmark"/>
                        {this.renderErrorMessageForColumn('address')}
                    </div>
                </div>

                <div className="gb-order-pane-edit-date">
                    <div className="gb-order-pane-edit-text">
                        Delivery date
                    </div>
                    <div className="gb-order-pane-edit-input">
                        <i className="icon-calendar"></i>

                        <DatePickerComponent
                            disabled={saving}
                            onChange={this.handleDateChange}
                            date={date}
                            className={this.classNameForColumn('date', date)}
                        />

                        <div className="gb-order-pane-edit-checkmark"/>
                        <div className="gb-order-pane-edit-crossmark"/>
                        {this.renderErrorMessageForColumn('date')}
                    </div>
                </div>

                <div className="gb-order-pane-edit-time">
                    <div className="gb-order-pane-edit-text">
                        Delivery time
                    </div>
                    <div className="gb-order-pane-edit-input">
                        <i className="icon-clock"></i>

                        <TimePickerComponent
                            disabled={saving}
                            onChange={this.handleTimeChange}
                            time={time}
                            className={this.classNameForColumn('time', time)}
                        />

                        <div className="gb-order-pane-edit-checkmark"/>
                        <div className="gb-order-pane-edit-crossmark"/>
                        {this.renderErrorMessageForColumn('date')}
                    </div>
                </div>

                <div className="gb-order-pane-edit-guests">
                    <div className="gb-order-pane-edit-text">
                        Guests
                    </div>
                    <div className="gb-order-pane-edit-input">
                        <i className="icon-profile"></i>
                        <input
                            disabled={saving}
                            type="number"
                            value={guests}
                            onChange={this.handleGuestsChange}
                            className={this.classNameForColumn('guests', guests)}
                        />

                        <div className="gb-order-pane-edit-checkmark"/>
                        <div className="gb-order-pane-edit-crossmark"/>
                        {this.renderErrorMessageForColumn('date')}
                    </div>
                </div>

                {this.isCancellable() && cancelButton}

                <div className={saveOrderInfoSet} onClick={this.handleSaveInfo}>
                    <div className="gb-order-pane-edit-save-spinner"/>

                    <div className="gb-order-pane-edit-save-text">
                        Save Order Info
                    </div>
                </div>
            </div>
        );
    }

    renderErrorMessageForColumn(columnName) {
        const {columnErrors} = this.state;

        const error = columnErrors[columnName];

        if (error) {
            return (
                <div className="gb-order-pane-edit-error-tooltip">
                    <div className="gb-prder-pane-edit-error-message">
                        {error.message}
                    </div>
                </div>
            );
        }
    }
}
