import React, {Component} from 'react';
import {inject} from 'yokohama';

export class ShareOrderModal extends Component {
    static propTypes = {
        children: React.PropTypes.node,
        requestClose: React.PropTypes.func
    };

    render() {
        const {children} = this.props;

        return (
            <div className="modal">
                <div className="gb-modal-body">
                    <h1>Order Share Modal</h1>
                    <div onClick={this.props.requestClose}>Close</div>
                </div>
            </div>
        );
    }
}
