import React, {Component, PropTypes} from 'react';
import {DatePickerComponent, TimePickerComponent} from '@goodybag/react-pickadate';
import cx from 'classnames';
import {ValidationResultError} from 'nagoya';
import {chain} from 'lodash';
import {listeningTo} from 'tokyo';

import {OrderParams} from '../../models/order-params';

export class OrderPaneEditComponent extends Component {
    static propTypes = {
        saving: PropTypes.bool.isRequired,
        orderParams: PropTypes.instanceOf(OrderParams).isRequired,
        saveButton: PropTypes.node,
        cancelButton: PropTypes.node,
        error: PropTypes.instanceOf(Error),
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        saving: false,
        saveButton: null,
        cancelButton: null,
        error: null
    };

    constructor(props) {
        super(props);

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleGuestsChange = this.handleGuestsChange.bind(this);
    }

    handleAddressChange(event) {
        const {orderParams, onChange: change} = this.props;
        const {target: {value}} = event;

        change(new OrderParams({
            ...orderParams,
            address: value || null
        }));
    }

    handleDateChange(date) {
        const {orderParams, onChange: change} = this.props;

        change(new OrderParams({...orderParams, date}));
    }

    handleTimeChange(time) {
        const {orderParams, onChange: change} = this.props;

        change(new OrderParams({...orderParams, time}));
    }

    handleGuestsChange(event) {
        const {target: {value}} = event;
        const {orderParams, onChange: change} = this.props;

        const guests = value ? parseInt(value) : null;

        change(new OrderParams({...orderParams, guests}));
    }

    inputBoxClassNameByValidity(state, show = false) {
        return cx('gb-order-pane-edit-box', {
            'gb-order-pane-edit-box-valid': state === 'valid',
            'gb-order-pane-edit-box-invalid': state === 'invalid',
            'gb-order-pane-edit-box-invalid-show': show
        });
    }

    classNameForColumn(columnName, value) {
        const {error} = this.props;

        if (error instanceof ValidationResultError) {
            const errors = error.byColumn(columnName);

            if (errors.length > 0) {
                return this.inputBoxClassNameByValidity('invalid',
                                                        this.shouldShowColumn(columnName));
            } else if (value != null) {
                return this.inputBoxClassNameByValidity('valid');
            }
        }

        return this.inputBoxClassNameByValidity();
    }

    shouldShowColumn(columnName) {
        const {error} = this.props;

        const columnNames = [
            'address',
            'date',
            'time',
            'guests'
        ];

        const result = chain(columnNames)
            .filter(name => error.byColumn(name).length > 0)
            .head()
            .value();

        return result === columnName;
    }

    render() {
        const {
            saving,
            saveButton,
            cancelButton,
            orderParams,
            error
        } = this.props;

        const {address, guests, date, time} = orderParams;

        const errorMessage = null && ( // TODO
            <div className="gb-order-pane-edit-exception">
                An unknown error occured
            </div>
        );

        const set = cx('gb-order-pane-edit', {
            'gb-order-pane-edit-saving': saving
        });

        return (
            <div className={set}>
                {errorMessage}

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
                        {this.renderErrorMessageForColumn('time')}
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
                        {this.renderErrorMessageForColumn('guests')}
                    </div>
                </div>

                {cancelButton}
                {saveButton}
            </div>
        );
    }

    renderErrorMessageForColumn(columnName) {
        const {error} = this.props;

        if (error instanceof ValidationResultError) {
            const errors = error.byColumn(columnName);

            return (
                <div className="gb-order-pane-edit-error-tooltip">
                    <div className="gb-order-pane-edit-error-message">
                        {errors.map(err => err.message).join(', ')}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="gb-order-pane-edit-error-tooltip"/>
            );
        }
    }
}

export class OrderPaneEditSaveComponent extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        children: 'Save Order Info',
        onClick: () => {}
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {onClick: click} = this.props;

        click();
    }

    render() {
        const {children} = this.props;

        return (
            <div className="gb-order-pane-edit-save" onClick={this.handleClick}>
                <div className="gb-order-pane-edit-save-spinner"/>

                <div className="gb-order-pane-edit-save-text">
                    {children}
                </div>
            </div>
        );
    }
}

export class OrderPaneEditCancelComponent extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        children: 'Cancel',
        onClick: () => {}
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {onClick: click} = this.props;

        click();
    }

    render() {
        const {saving, children} = this.props;

        return (
            <div className="gb-order-pane-edit-cancel"
                onClick={this.handleClick}
                children={children}
            />
        );
    }
}
