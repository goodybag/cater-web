import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

export class OrderPaneHeaderComponent extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.node,
        initiallyOpen: PropTypes.bool.isRequired
    };

    static defaultProps = {
        initiallyOpen: true
    };

    constructor(props) {
        super(props);

        const {initiallyOpen} = this.props;

        this.state = {
            open: initiallyOpen
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(({open}) => {
            return {open: !open};
        });
    }

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

                <div className="gb-order-pane-section">
                    {children}
                </div>
            </div>
        );
    }
}
