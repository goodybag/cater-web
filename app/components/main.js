import React, {Component, PropTypes} from 'react';
import {IntlProvider} from 'react-intl';
import {router} from 'hiroshima';
import {inject} from 'yokohama';
import {ModalContainer, ModalState} from '../lib/modal';

import * as formats from '../formats';
import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

@router(route => {
    route.use(RestaurantComponent);
})
@inject({
    modals: ModalState
}, [NavbarComponent])
export class MainComponent extends Component {
    static propTypes = {
        children: PropTypes.node,
        modals: PropTypes.instanceOf(ModalState)
    };

    render() {
        const {children} = this.props;

        return (
            <div className="gb-main" ref="gbMain">
                <ModalContainer modalState={this.props.modals} />
                <NavbarComponent/>
                {children}
            </div>
        );
    }
}

export class MainContainerComponent extends React.Component {
    static childContextTypes = {
        dependencyCache: PropTypes.instanceOf(Map)
    };

    static propTypes = {
        dependencyCache: PropTypes.instanceOf(Map).isRequired,
        components: PropTypes.arrayOf(React.PropTypes.func).isRequired
    };

    getChildContext() {
        const {dependencyCache} = this.props;

        return {dependencyCache};
    }

    // components:
    // [Main, Restaurant, RestaurantMenu]
    //
    // render:
    // <Main>
    //   <Restaurant>
    //     <RestaurantMenu/>
    //   </Restaurant>
    // </Main>
    render() {
        const {components} = this.props;

        const element = components.slice(0, -1).reduceRight(function(left, right) {
            return React.createElement(right, null, left);
        }, React.createElement(components[components.length - 1], null));

        return (
            <IntlProvider locale="en" formats={formats}>
                {element}
            </IntlProvider>
        );
    }
}
