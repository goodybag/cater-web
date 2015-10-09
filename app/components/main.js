import React, {Component} from 'react';
import {router} from 'hiroshima';
import {dependencies} from 'yokohama';

import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

@router(route => {
    route.use(RestaurantComponent);
})
@dependencies({}, [NavbarComponent])
export class MainComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    render() {
        const {children} = this.props;

        return (
            <div className="gb-main" ref="gbMain">
                <NavbarComponent/>

                {children}
            </div>
        );
    }
}

export class MainContainerComponent extends React.Component {
    static childContextTypes = {
        dependencies: React.PropTypes.object
    }

    static propTypes = {
        dependencies: React.PropTypes.object.isRequired,
        components: React.PropTypes.arrayOf(React.PropTypes.func).isRequired
    }

    getChildContext() {
        const {dependencies} = this.props;

        return {dependencies};
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

        return components.slice(0, -1).reduceRight(function(left, right) {
            return React.createElement(right, null, left);
        }, React.createElement(components[components.length - 1], null));
    }
}
