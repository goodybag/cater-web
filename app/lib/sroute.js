import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {Route} from 'hiroshima';
import {Injector, dependencies, provide} from 'yokohama';
import {IncomingMessage, ServerResponse} from 'http';

import {MainContainerComponent} from '../components/main';
import {Config} from './config';
import {Polyfills} from './polyfills';
import {mocks} from './smocks';

/**
 * Given appropriate application context,
 * it mocks the associated dependencies and
 * loads the entry point for the render.
 */
export function loadPage({req, res, config, components, route}) {
    const tokens = components.map(component => component.Dependency);

    @provide(IncomingMessage)
    class MockRequest {
        constructor() {
            return req;
        }
    }

    @provide(ServerResponse)
    class MockResponse {
        constructor() {
            return res;
        }
    }

    @provide(Config)
    class MockConfig {
        constructor() {
            return config;
        }
    }

    @provide(Route)
    class MockRoute {
        constructor() {
            return route;
        }
    }

    @dependencies({
        injector: Injector,
        polyfills: Polyfills
    }, tokens)
    class EntryPoint {
        constructor({injector, polyfills}) {
            this.injector = injector;
            this.polyfills = polyfills;
        }

        render() {
            const cache = this.injector.dump();

            const markup = renderToString(
                <MainContainerComponent
                    components={components}
                    dependencyCache={cache}
                />
            );

            const data = serializable(cache);

            const encodedData = new Buffer(JSON.stringify(data)).toString('base64');
            const script = `window.__GBDATA__=JSON.parse(atob('${encodedData}'))`;

            const doc = (
                <html>
                    <head>
                        <title>Goodybag</title>
                        <meta charSet="utf-8"/>
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
                        <link rel="stylesheet" href={config.resolveAssetURL('main.css')}/>
                    </head>

                    <body>
                        <div id="gb-body"
                            dangerouslySetInnerHTML={{__html: markup}}
                        />

                        <script dangerouslySetInnerHTML={{__html: this.polyfills.script}}/>
                        <script dangerouslySetInnerHTML={{__html: script}}/>
                        <script src={config.resolveAssetURL('bundle.js')}/>
                    </body>
                </html>
            );

            return {
                html: renderToStaticMarkup(doc)
            };
        }
    }

    const injector = new Injector([
        MockRequest,
        MockResponse,
        MockConfig,
        MockRoute,
        ...mocks
    ]);

    return injector.get(EntryPoint).then(entry => {
        return entry.render();
    });
}

/**
 * Collects and serializes all serializable
 * dependencies in the given cache.
 */
function serializable(cache) {
    const data = {};

    cache.forEach((inst, token) => {
        if (inst && inst.constructor && typeof inst.constructor.parse === 'function') {
            data[token.uuid || token.name] = inst;
        }
    });

    return data;
}
