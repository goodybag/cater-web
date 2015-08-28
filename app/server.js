import {createServer} from 'http';

import {app, user, restaurant} from './';

export const server = createServer(app);

Promise.all([user.fetch(), restaurant.fetch()]).then(function() {
    server.listen(process.env.PORT || 9000, function() {
        console.log('Listening...');
    });
}, function(err) {
    process.nextTick(function() {
        throw err;
    });
});
