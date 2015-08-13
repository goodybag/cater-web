import {createServer} from 'http';

import {app} from './app';

export const server = createServer(app);

server.listen(process.env.PORT || 9000, function() {
    console.log('Listening...');
});
