import React, {Component, PropTypes} from 'react';

export class ErrorComponent extends Component {
    static propTypes = {
        error: PropTypes.object
    }

    render() {
        const {error} = this.props;

        const gb = {
            container: {
                boxSizing: 'border-box',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '20px 0',
                fontFamily: ['Avenir', 'Proxima Nova', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
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

        return (
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

                <pre style={gb.stackTrace}>{error.message}{'\n'}{error.stack}</pre>
            </div>
        );
    }
}
