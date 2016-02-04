import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';
import {ModalState} from './state';

export class ModalContainer extends React.Component {
    constructor( props ){
        super( props );

        this.state = {
            modals: []
        };

        this.onModalStateChange = this.onModalStateChange.bind( this );
        this.onModalOverlayClick = this.onModalOverlayClick.bind( this );
    }

    componentWillMount(){
        this.props.modalState.on( 'change', this.onModalStateChange );
    }

    componentWillUnmount(){
        this.props.modalState.removeEventListener( 'change', this.onModalStateChange );
    }

    render(){
        var modalOpen = this.state.modals.length > 0;
        var { modalState } = this.props;

        return (
            <div className={classnames({
                'modal-wrapper': true
            })}>

                <CSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={modalState.transitionDuration}
                    transitionLeaveTimeout={modalState.transitionDuration}
                >
                    { modalOpen
                        ? <div className="modal-overlay" onClick={this.onModalOverlayClick} />
                        : null
                    }
                    {this.state.modals.map( (modal, i)=>{
                        return (
                            <modal.Component
                                key={i}
                                modalState={modalState}
                                {...modal.props}
                                requestClose={modalState.close.bind( modalState, modal.Component )}
                            />
                        );
                    })}
                </CSSTransitionGroup>
            </div>
        );
    }

    onModalStateChange(){
        this.setState({
            modals: this.props.modalState.toArray()
        });
    }

    onModalOverlayClick(){
        this.props.modalState.closeAll();
    }
}

ModalContainer.propTypes = {
    modalState: React.PropTypes.instanceOf( ModalState )
}
