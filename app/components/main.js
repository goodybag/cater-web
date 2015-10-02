import React, {Component} from 'react';
import {dependencies} from 'yokohama';

import {NavbarComponent} from './navbar';
import {RestaurantComponent} from './restaurant';

export class MainComponent extends Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    @dependencies({}, [
        NavbarComponent
    ]);

    static route(router) {
        router.use(RestaurantComponent);
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
        dependencies: React.PropTypes.object,
        route: React.PropTypes.object
    }

    static propTypes = {
        dependencies: React.PropTypes.object.isRequired,
        components: React.PropTypes.arrayOf(React.PropTypes.func).isRequired,
        route: React.PropTypes.object.isRequired
    }

    getChildContext() {
        const {dependencies, route} = this.props;

        return {dependencies, route};
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
