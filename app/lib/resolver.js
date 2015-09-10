import lodash from 'lodash';
import {Params, provide, inject} from './injection';
import {Injector} from 'di';

export default class Resolver {
    constructor(dependencies, options = {}) {
        this.dependencies = dependencies;
        this.options = options;
    }

    resolveFrom(data) {
        const results = this.dependencies.filter(hasParser).map(dep => {
            return dep.token.parse(data[dep.name]);
        });

        return this.shapeResults(results);
    }

    resolve(injector = this.makeInjector()) {
        const finalizer = this.makeFinalizer();

        return injector
            .getPromise(finalizer)
            .then(values => this.shapeResults(values));
    }

    makeInjector() {
        const {mocks = []} = this.options;

        return new Injector(mocks);
    }

    makeFinalizer() {
        @inject(...lodash.pluck(this.dependencies, 'token'))
        class Finalizer {
            constructor(...args) {
                return args;
            }
        }

        return Finalizer;
    }

    shapeResults(values) {
        const {dependencies} = this;
        const results = {};

        values.forEach((value, index) => {
            let {name} = dependencies[index];

            results[name] = value;
        });

        return results;
    }

    getResolvers() {
        return lodash.pluck(this.dependencies, 'resolver');
    }
}

export function readDependencies(components) {
    const deps = lodash.chain(components)
        .pluck('dependencies')
        .reduce((a, b) => ({...a, ...b}))
        .map(toDependency)
        .value();

    return deps;
}

export function mockParams(params) {
    @provide(Params)
    class MockParams {
        constructor() {
            return params;
        }
    }

    return MockParams;
}

function toDependency(token, name) {
    return {name, token};
}

function hasParser(dependency) {
    return dependency.token && typeof dependency.token.parse === 'function';
}
