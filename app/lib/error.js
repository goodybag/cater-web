import React from 'react';
import {render} from 'react-dom';
import Promise from 'bluebird';

export function handleError(err) {
    return Promise.try(() => {
        console.error(err.stack);

        const gb = {
            container: {
                boxSizing: 'border-box',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '20px 0'
            },

            header: {
                marginBottom: '10px',
                padding: '0 20px'
            },

            headerTitle: {
                display: 'inline-block',
                fontSize: '32px',
                fontWeight: 600,
                lineHeight: '36px'
            },

            headerAttribution: {
                display: 'inline-block',
                fontStyle: 'italic',
                fontSize: '14px'
            },

            text: {
                padding: '0 20px'
            },

            line: {
                fontSize: '18px',
                margin: '5px 0'
            },

            stackTrace: {
                backgroundColor: '#fafafa',
                fontSize: '14px',
                overflow: 'scroll',
                padding: '20px'
            }
        };

        const page = (
            <div style={gb.container}>
                <div style={gb.header}>
                    <div style={gb.headerTitle}>An error occured</div>
                    {' '}
                    <div style={gb.headerAttribution}>A poem by Tenor Biel</div>
                </div>

                <div style={gb.text}>
                    <div style={gb.line}>We're sorry.</div>
                    <div style={gb.line}>Try taking a deep breath.</div>
                    <div style={gb.line}>Everything will be ok.</div>
                    <div style={gb.line}>Try not to worry.</div>
                    <div style={gb.line}>Everything will be ok.</div>
                </div>

                <pre style={gb.stackTrace}>{err.message}{'\n'}{err.stack}</pre>
            </div>
        );

        return Promise.fromNode(cb => {
            render(page, document.getElementById('gb-body'), cb);
        });
    }).catch(err => {
        console.error(err.stack);

        alert('An error occured when displaying an error page');
    });
}
